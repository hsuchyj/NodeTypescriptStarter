"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
//import {model}
//const User = require("../src/model.ts");
const model_1 = __importDefault(require("./model"));
class Controller {
    getHello(req, res) {
        res.send("Hello World");
    }
    postJello(req, res) {
        res.send(req.body);
    }
    setupDb() {
        //username:password
        var mongoDb = 'mongodb+srv://everyone:cisc474@cluster0-ehxde.mongodb.net/test?retryWrites=true&w=majority';
        mongoose_1.default.connect(mongoDb, { useNewUrlParser: true,
            useUnifiedTopology: true });
        var db = mongoose_1.default.connection;
        db.on('error', console.error.bind(console, 'MongoDB Connection error'));
    }
    createUser(req, res) {
        //console.log(req.body.user);
        /*
        {
            "user":"whatever"
            "password":"okiedokie"
        }
        */
        res.send("new user created");
        const newUser = new model_1.default({ username: req.body.user, password: req.body.password });
        newUser.save();
    }
}
exports.Controller = Controller;
//# sourceMappingURL=controller.js.map