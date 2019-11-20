const jwt = require("jsonwebtoken");
const cryptov = require("crypto");
const User = require("./models/userModel"); // Fixed the path here
const config = require("../config/config");
import * as express from "express";
import { IUser } from "./models/userModel";

function generateToken(user: any) {
    return jwt.sign(user, config.secret, {
        expiresIn: 10080 // in seconds
    });
}

// =================================
// Login Route
// =================================
exports.login = function(req: express.Request, res: express.Response, next: any) {
    User.findOne({ email: req.body.email }, function(err: any, user: any) {
        if (err) { return res.status(400).json({ error: "bad data" }); }
        if (!user) { return res.status(400).json({ error: "Your login details could not be verified." }); }
        user.comparePassword(req.body.password, function(err: any, isMatch: boolean) {
            if (err) { return res.status(400).json({ error: "bad data" }); }
            if (!isMatch) { return res.status(400).json({ error: "Your login details could not be verified." }); }

            const userInfo = user.toJson();
            res.status(200).json({
                token: "Bearer " + generateToken(userInfo),
                user: userInfo
            });
        });
    });
};

exports.authorize = function(req: express.Request, res: express.Response, next: any) {
    return res.status(200).json({
        validated: true
    });
};

// ===================================
// Registration Route
// ===================================
// Modified by Collin to comply with our User Model
exports.register = function(req: express.Request, res: express.Response, next: any) {
    // Check for registration errors
    const email = req.body.email;
    const username = req.body.username;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const password = req.body.password;
    const clientid = req.body.clientid;
    const about = req.body.about;
    let authAPIs = req.body.authAPIs;

    if (!authAPIs) {
        authAPIs = [];
    }
    if (!clientid) {
        return res.status(422).send({ error: "No clientid passed to register against." });
    }
    if (!email) {
        return res.status(422).send({ error: "You must enter an email address." });
    }
    if (!firstName || !lastName) {
        return res.status(422).send({ error: "You must enter your full name." });
    }
    if (!password) {
        return res.status(422).send({ error: "You must enter a password." });
    }

    if (!username) {
        return res.status(422).send({ error: "You must enter a username"});
    }

    User.findOne({ email }, function(err: any, existingUser: any) {
        if (err) { return next(err); }
        if (existingUser) {
            if (existingUser.auths.clients.filter(function(item: any) { return item === clientid; }).length > 0) {
                return res.status(422).send({ error: "That email address is already in use for this client." });
            } else {
                existingUser.auths.clients.push(clientid);
                let i: number;
                for (i = 0; i < authAPIs.length; i++) {
                    if (existingUser.auths.apis.filter(function(item: any) {
                        return item === authAPIs[i];
                    }).length === 0) {
                        existingUser.auths.apis.push(authAPIs[i]);
                    }
                }
                existingUser.save(function(err: any, user: any) {
                    if (err) { return next(err); }
                    const userInfo = existingUser.toJson();
                    res.status(201).json({
                        token: "JWT " + generateToken(userInfo),
                        user: userInfo
                    });
                });
            }
        } else {
            const user: IUser = new User({
                username,
                password,
                email,
                firstName,
                lastName,
                about,
                provider: "local",
                roles: ["User"],
                auths: { clients: [clientid], apis: authAPIs },
            });
            user.save(function(err: any, user: any) {
                if (err) { return next(err); }
                const userInfo = user.toJson();
                res.status(201).json({
                    token: "JWT " + generateToken(userInfo),
                    user: userInfo
                });
            });
        }
    });
};
