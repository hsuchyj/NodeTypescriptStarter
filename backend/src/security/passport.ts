// // Importing Passport, strategies, and config
// // Everything looks good to me
// const passport = require("passport");
// const User = require("../models/userModel");
// // const config = require("../config/config");
// const JwtStrategy = require("passport-jwt").Strategy;
// const ExtractJwt = require("passport-jwt").ExtractJwt;
// const mongoose = require("mongoose");
// const secret = "ODK5rECI*bGj4ffHg7ybtzQ2*";

// const jwtOptions = {
//     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//     secretOrKey: secret
// };

// // Setting up JWT login strategy
// const JWTLogin = new JwtStrategy(jwtOptions, function(payload: any, done: any) {
//     const id = new mongoose.Types.ObjectId(payload._id);
//     User.findbyId(id, function(err: any, user: any) {
//         if (err) { return done(err, false); }

//         if (user) {
//             done(null, user);
//         } else {
//             done(null, false, { message: "User was not found"});
//         }
//     });
// });

// passport.use(JWTLogin);

// exports.requireAuth = function() { 
//     passport.authenticate("jwt", { session: false });
//  };

// Importing Passport, strategies, and config
import { UserModel as User } from "./../models/userModel";
import { config } from "./../config/config"; 
const passport = require("passport");
//    User = require('../models/userModel'),
   // config = require('../config/config'),
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.secret
};

// Setting up JWT login strategy
const JWTLogin = new JwtStrategy(jwtOptions, function(payload: any, done: any) {
    const id = new mongoose.Types.ObjectId(payload._id);
    User.findById(id, function(err: any, user: any) {
        if (err) { return done(err, false); }

        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    });

});
passport.use(JWTLogin);
exports.requireAuth = passport.authenticate("jwt", { session: false });   
