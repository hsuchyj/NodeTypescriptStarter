/*
const dotenv = require("dotenv").config();
const express = require("express");
const auth = require("../authentication").default;
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const db = require("../server");

export = () => {
    const app = express();

    app.use(bodyParser.json());
    app.use(expressValidator());

    app.use(auth.initialize());

    app.all(process.env.API_BASE + "*", (req, res, next) => {
        if (req.path.includes(process.env.API_BASE + "login")) { return next(); }

        return auth.authenticate((err, user, info) => {
            if (err) { return next(err); }
            if (!user) {
                if (info.name === "TokenExpiredError") {
                    return res.status(401).json({ message: "Your token has expired. Please generate a new one" });
                } else {
                    return res.status(401).json({ message: info.message });
                }
            }
            app.set("user", user);
            return next();
        })(req, res, next);
    });

    const routes = require("../router")(app);

    return app;
};
*/
