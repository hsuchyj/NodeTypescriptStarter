"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const controller_1 = require("./controller");
class ApiRouter {
    constructor() {
        this.router = express.Router();
        this.controller = new controller_1.Controller();
    }
    // Creates the routes for this router and returns a populated router object
    getRouter() {
        this.controller.setupDb();
        //go to http://localhost:3000/api/users to add a user to the db
        this.router.post("/users", this.controller.createUser);
        this.router.get("/users/:id", this.controller.createUser);
        //go to http://localhost:3000/api/newUser to add a user to the db
        this.router.get("/newUser", this.controller.createUser);
        // go to http://localhost:3000/api/newUser to add a user to the db
        this.router.post("/user", this.controller.create);

        this.router.post("/newUser", this.controller.createUser);
        this.router.get("/hello", this.controller.getHello);
        this.router.post("/hello", this.controller.postJello);
        return this.router;
    }
}
exports.ApiRouter = ApiRouter;
//# sourceMappingURL=router.js.map