"use strict";
exports.__esModule = true;
var express = require("express");
var controller_1 = require("./controller");
var ApiRouter = /** @class */ (function () {
    function ApiRouter() {
        this.router = express.Router();
        this.controller = new controller_1.Controller();
    }
    // Creates the routes for this router and returns a populated router object
    ApiRouter.prototype.getRouter = function () {
        this.controller.setupDb();
        //go to http://localhost:3000/api/newUser to add a user to the db
        this.router.get("/newUser", this.controller.create);
        this.router.get("/hello", this.controller.getHello);
        this.router.post("/hello", this.controller.postJello);
        return this.router;
    };
    return ApiRouter;
}());
exports.ApiRouter = ApiRouter;
