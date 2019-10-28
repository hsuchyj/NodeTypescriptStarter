const jwt = require('jsonwebtoken'),
    cryptov = require('crypto'),
    User = require('../models/userModel'),
    config = require('../config/config');

function generateToken(user: any) {
    return jwt.sign(user, config.secret, {
        expiresIn: 10080 // in seconds
    });
}

//=================================
// Login Route
//=================================
exports.login = function (req: any, res: any, next: any) {
    User.findOne({ email: req.body.email }, function (err: any, user: any) {
        if (err) { return res.status(400).json({ error: "bad data" }); }
        if (!user) { return res.status(400).json({ error: 'Your login details could not be verified.' }); }
        user.comparePassword(req.body.password, function (err: any, isMatch: any) {
            if (err) { return res.status(400).json({ error: "bad data" }); }
            if (!isMatch) { return res.status(400).json({ error: 'Your login details could not be verified.' }); }

            let userInfo = user.toJson();
            res.status(200).json({
                token: "Bearer " + generateToken(userInfo),
                user: userInfo
            });
        });
    });
}

exports.authorize = function (req: any, res: any, next: any) {
    return res.status(200).json({
        validated: true
    })
}

//===================================
// Registration Route
//===================================
exports.register = function (req: any, res: any, next: any) {
    // Check for registration errors
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const password = req.body.password;
    const clientid = req.body.clientid;
    let authAPIs = req.body.authAPIs;

    if (!authAPIs)
        authAPIs = [];
    if(!clientid)
        return res.status(422).send({ error: "No clientid passed to register against." });
    if (!email) {
        return res.status(422).send({ error: "You must enter an email address." });
    }
    if (!firstName || !lastName) {
        return res.status(422).send({ error: "You must enter your full name." });
    }
    if (!password) {
        return res.status(422).send({ error: "You must enter a password." });
    }

    User.findOne({ email: email }, function (err: any, existingUser: any) {
        if (err) { return next(err); }
        if (existingUser) {
            if (existingUser.auths.clients.filter(function (item: any) { return item == clientid }).length > 0) {
                return res.status(422).send({ error: "That email address is already in use for this client." });
            } else {
                existingUser.auths.clients.push(clientid);
                let i: number;
                for (i = 0; i < authAPIs.length; i++) {
                    if (existingUser.auths.apis.filter(function (item: any) {
                        return item === authAPIs[i];
                    }).length == 0) {
                        existingUser.auths.apis.push(authAPIs[i]);
                    }
                }
                existingUser.save(function (err: any, user: any) {
                    if (err) { return next(err); }
                    let userInfo = existingUser.toJson();
                    res.status(201).json({
                        token: 'JWT ' + generateToken(userInfo),
                        user: userInfo
                    });
                });
            }
        } else {
            let user = new User({
                email: email,
                password: password,
                provider: 'local',
                roles: ['User'],
                auths: { clients: [clientid], apis: authAPIs },
                profile: { firstName: firstName, lastName: lastName }
            });
            user.save(function (err: any, user: any) {
                if (err) { return next(err); }
                let userInfo = user.toJson();
                res.status(201).json({
                    token: "JWT " + generateToken(userInfo),
                    user: userInfo
                });
            });
        }
    });
}