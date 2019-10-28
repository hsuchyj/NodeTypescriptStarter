import * as express from "express";
import {Controller} from "./controller";

export class ApiRouter {
    private router: express.Router = express.Router();
    private controller: Controller = new Controller();

    // Creates the routes for this router and returns a populated router object
    public getRouter(): express.Router {

        this.controller.setupDb();
        // go to http://localhost:3000/api/users to add a user to the db
        this.router.post("/users", this.controller.createUser);
        this.router.get("/users/:id", this.controller.readUser);
        this.router.put("/users/:id", this.controller.updateUser);
        this.router.delete("/users/:id", this.controller.deleteUser);

        // go to http://localhost:3000/api/newUser to add a user to the db
        // this.router.post("/newUser", this.controller.createUser);

        // restaurant endpoints
        this.router.post("/restaurant", this.controller.createRestaurant);
        this.router.get("/restaurant/:id", this.controller.getRestaurant);
        this.router.get("/restaurant/all/all", this.controller.getAllRestaurants); // might change
        this.router.delete("/restaurant/:id", this.controller.deleteRestaurant);
        this.router.put("/restaurant/:id", this.controller.updateRestaurant);

        this.router.get("/hello", this.controller.getHello);
        this.router.post("/hello", this.controller.postJello);
        return this.router;
    }
}
