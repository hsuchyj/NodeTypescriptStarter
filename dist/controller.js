"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
<<<<<<< Updated upstream
//import {model}
//const User = require("../src/model.ts");
<<<<<<< HEAD
const model_1 = __importDefault(require("../model"));
=======
const userSchema = new mongoose_1.default.Schema({
    username: String,
    password: String
});
const User = mongoose_1.default.model("User", userSchema);
>>>>>>> Stashed changes
=======
const model_1 = __importDefault(require("./model"));
>>>>>>> Hunter
class Controller {
    getHello(req, res) {
        res.send("Hello World");
    }
    postJello(req, res) {
        res.send(req.body);
    }
    setupDb() {
<<<<<<< Updated upstream
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
<<<<<<< HEAD
        console.log("something");
=======
        // username:password
        const mongoDb = "mongodb+srv://everyone:cisc474@cluster0-ehxde.mongodb.net/test?retryWrites=true&w=majority";
        mongoose_1.default.connect(mongoDb, { useNewUrlParser: true,
            useUnifiedTopology: true });
        const db = mongoose_1.default.connection;
        db.on("error", console.error.bind(console, "MongoDB Connection error"));
    }
    // creates new user, adds to db, and returns new user
    create(req, res) {
        /*req.body = {
            username: String,
            password: String
        };*/
        console.log(req.body);
        // const rand = Math.floor(Math.random() * 240) + 80;
        // provide a username and password in the body when posting a new user
        const newUser = new User({ username: JSON.parse(req.body.username),
            password: req.body.password });
        console.log(newUser);
        // newUser.save();
        res.send(req.body);
>>>>>>> Stashed changes
=======
>>>>>>> Hunter
    }
}
exports.Controller = Controller;
//# sourceMappingURL=controller.js.map