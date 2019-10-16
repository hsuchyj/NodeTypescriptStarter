"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var Controller = /** @class */ (function () {
    function Controller() {
    }
    Controller.prototype.getHello = function (req, res) {
        res.send("Hello World");
    };
    Controller.prototype.postJello = function (req, res) {
        res.send(req.body);
    };
    Controller.prototype.setupDb = function () {
        //username:password
        var mongoDb = 'mongodb+srv://everyone:cisc474@cisc474-ehxde.azure.mongodb.net/test?retryWrites=true&w=majority';
        mongoose.connect(mongoDb, { useNewUrlParser: true,
            useUnifiedTopology: true });
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'MongoDB Connection error'));
    };
    Controller.prototype.create = function () {
        var userSchema = new mongoose.Schema({
            username: String,
            password: String
        });
        var User = mongoose.model('User', userSchema);
        var newUser = new User({ username: 'test', password: "password" });
        newUser.save();
        console.log("something");
    };
    return Controller;
}());
exports.Controller = Controller;
