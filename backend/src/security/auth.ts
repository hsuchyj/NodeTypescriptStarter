import * as jwt from "jwt-simple";
import * as passport from "passport";
import { default as moment } from "moment"; // This might be an issue
import { Strategy, ExtractJwt } from "passport-jwt";
import { default as User, IUser } from "../models/userModel";

// Authorization class declaration
class Auth {
    
    // Initiailization method
    // Calls getStrategy to set the jwt strategy
    // Returns a call to the initiailization method of passport
    public initialize = () => {
        passport.use("jwt", this.getStrategy());
        return passport.initialize();
    }

    public authenticate = (callback: any) => passport.authenticate
        ("jwt", { session: false, failWithError: true }, callback);

    // Login method for authentication
    public login = async (req: any, res: any) => {
        // Try to authenticate the user using their credentials
        try {
            // Check the body for validity and if they are empty
            req.checkBody("username", "Invalid username").notEmpty();
            req.checkBody("password", "Invalid password").notEmpty();

            // If any errors were returned throw them to the user
            const errors = req.ValidationErrors();
            if (errors) { throw errors; }

            // Grab the user record for the given user
            const user = await User.findOne({ username: req.body.user }).exec();

            // Throw an error if we cant find the user
            if (user === null) { throw new Error("User not found"); }

            // Run our comparePassword method to authenticate the user
            // TODO: Need to actually implement that
            const success = await user.comparePassword(req.body.password);
            if (success === false) { throw new Error(""); }
            res.status(200).json(this.genToken(user));
        } catch (err) {
            // If the authentication failed, let the user know
            res.status(401).json({ message: "Invalid credentials", errors: err });
        }
    }

    private genToken = (user: IUser): object => {
        // Creates an expiration data object for the token at 7 days
        const expires = moment().utc().add({days: 7}).unix();
        
        // Create a token with the expiration and username
        // Encode with the JWT_SECRET
        const token = jwt.encode({
            exp: expires,
            username: user.username
        }, process.env.JWT_SECRET);

        // Returns a token with the user ID in the database
        // And sets and formats the expires field appropriately
        return {
            token: "JWT " + token,
            expires: moment.unix(expires).format(),
            user: user._id
        };
    }

    // This function sets the strategy for Passport to JWT
    // We will extract the token from the Authorization header
    private getStrategy = (): Strategy => {
        const params = {
            secretOrKey: process.env.JWT_SECRET,
            jwtFromRequest: ExtractJwt.fromAuthHeader(),
            passReqToCallback: true
        };

        return new Strategy(params, (req: any, payload: any, done: any) => {
            User.findOne({ username: payload.username }, (err, user) => {
                if (err) {
                    return done(err);
                }
    
                if (user === null) {
                    return done(null, false, { message: "The user in the token was not found" });
                }

                return done(null, { _id: user._id, username: user.username });
            });
        });
    }
}

export default new Auth();
