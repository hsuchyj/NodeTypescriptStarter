import bodyParser from "body-parser";
import express from "express";
// const expressValidator = require("express-validator");
// const { check, validationResult } = require("express-validator");
import auth from "./security/auth";

import {ApiRouter} from "./router";

class Application {
    public app: express.Application;
    public port: number;

    constructor() {
        this.app = require("../security/express");
        this.app = express();
        this.port = +process.env.serverPort || 3000;
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
        // this.app.use(expressValidator());
        // this.app.use(check());
        this.app.use(auth.initialize());
        this.initCors();
        this.app.all(process.env.API_BASE + "*", (req, res, next) => {
            if (req.path.includes(process.env.API_BASE + "login")) { return next(); }
    
            return auth.authenticate((err: any, user: any, info: any) => {
                if (err) { return next(err); }
                if (!user) {
                    if (info.name === "TokenExpiredError") {
                        return res.status(401).json({ message: "Your token has expired. Please generate a new one" });
                    } else {
                        return res.status(401).json({ message: info.message });
                    }
                }
                this.app.set("user", user);
                return next();
            })(req, res, next);
        });
    }
    // Starts the server on the port specified in the environment or on port 3000 if none specified.
    public start(): void {
        this.buildRoutes();
        this.app.listen(this.port, () => console.log("Server listening on port " + this.port + "!"));
    }

    // sets up to allow cross-origin support from any host.  You can change the options to limit who can access the api.
    // This is not a good security measure as it can easily be bypassed,
    // but should be setup correctly anyway.  Without this, angular would not be able to access the api it it is on
    // another server.
    public initCors(): void {
        this.app.use(function(req: express.Request, res: express.Response, next: any) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
            res.header("Access-Control-Allow-Credentials", "true");
            next();
        });
    }
    // setup routes for the express server
    public buildRoutes(): void {
        this.app.use("/api", new ApiRouter().getRouter());
    }
}
new Application().start();
