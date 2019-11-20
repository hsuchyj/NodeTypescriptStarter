// Importing Passport, strategies, and config
// Everything looks good to me
const passport = require("passport");
const User = require("../model/userModel");
const config = require("../config/config");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");

export const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.secret
};

// Setting up JWT login strategy
export const JWTLogin = new JwtStrategy(jwtOptions, function(payload: any, done: any) {
    const id = new mongoose.Types.ObjectId(payload._id);
    User.findbyId(id, function(err: any, user: any) {
        if (err) { return done(err, false); }

        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    });
});
passport.use(JWTLogin);
exports.requireAuth = function() { passport.authenticate("jwt", { session: false }); };
