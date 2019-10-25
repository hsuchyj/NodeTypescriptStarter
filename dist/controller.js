"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// import {model}
// const User = require("../src/model.ts");
const userModel_1 = __importDefault(require("./models/userModel"));
const restaurantModel_1 = __importDefault(require("./models/restaurantModel"));
class Controller {
    getHello(req, res) {
        res.send("Hello World");
    }
    postJello(req, res) {
        res.send(req.body);
    }
    setupDb() {
        // username:password
        const mongoDb = "mongodb+srv://everyone:cisc474@cluster0-ehxde.mongodb.net/test?retryWrites=true&w=majority";
        mongoose_1.default.connect(mongoDb, { useNewUrlParser: true,
            useUnifiedTopology: true });
        const db = mongoose_1.default.connection;
        db.on("error", console.error.bind(console, "MongoDB Connection error"));
    }
    // TODO update the User to the new schema
    createUser(req, res) {
        // console.log(req.body.user);
        /*
        ^^^^^^^
        {
            "user":"whatever",
            "password":"okiedokie"
        }
        */
        res.send("new user created");
        const newUser = new userModel_1.default({ username: req.body.user, password: req.body.password });
        newUser.save();
    }
    readUser(req, res) {
        //if entry exists returns it as json
        userModel_1.default.findById(req.params.id, "username password", { lean: true }, function (err, doc) {
            if (doc == null) {
                res.send("User does not exist");
            }
            else
                res.json(doc);
        });
        /*
        check if entry exists

        const result = User.exists({username:"rick and morty"});
        result.then(function(result2) {
            console.log(result2) // "Some User token"
         })*/
    }
    getRestaurant(req, res) {
        res.send("GET");
    }
    updateRestaurant(req, res) {
        res.send("PUT");
    }
    deleteRestaurant(req, res) {
        res.send("DELETE");
    }
    createRestaurant(req, res) {
        // res.send("POST");
        const newRestaurant = new restaurantModel_1.default({
            name: req.body.name,
            city: req.body.city,
            state: req.body.state,
            address: req.body.address,
            website: req.body.website,
            description: req.body.description
        });
        newRestaurant.save();
        res.send(req.body);
    }
}
exports.Controller = Controller;
//# sourceMappingURL=controller.js.map