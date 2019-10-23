import * as express from "express";
import {Controller} from "./controller";

export class ApiRouter {
    private router: express.Router = express.Router();
    private controller: Controller = new Controller();

    // Creates the routes for this router and returns a populated router object
    public getRouter(): express.Router {

        this.controller.setupDb();
        //go to http://localhost:3000/api/users to add a user to the db
        this.router.post("/users", this.controller.createUser);
        this.router.get("/users/:id", this.controller.createUser);
        this.router.get("/hello", this.controller.getHello);
        this.router.post("/hello", this.controller.postJello);
        return this.router;
    }
}
