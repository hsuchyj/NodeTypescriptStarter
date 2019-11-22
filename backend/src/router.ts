import * as express from "express";
import {Controller} from "./controller";
import * as authentication from "./authentication"; // added this to get authentication methods
import * as passportService from "./security/passport";

export class ApiRouter {
    private router: express.Router = express.Router();
    private controller: Controller = new Controller();
    private passportService: any = passportService;
    private authentication: any = authentication;

    // Creates the routes for this router and returns a populated router object
    public getRouter(): express.Router {

        this.controller.setupDb();
        // go to http://localhost:3000/api/users to add a user to the db
        this.router.post("/users", this.controller.createUser);
        this.router.get("/users/:id", this.passportService.requireAuth, this.controller.readUser); // protected
        // this.router.get("/users/:id", this.controller.readUser);
        this.router.put("/users/:id", this.controller.updateUser);
        this.router.delete("/users/:id", this.controller.deleteUser);

        // Authentication stuff
        this.router.get("/authorize", this.passportService.requireAuth, this.authentication.authorize); // protected
        this.router.post("/register", this.authentication.register); // unprotected
        this.router.post("/login", this.authentication.login); // unprotected

        // go to http://localhost:3000/api/newUser to add a user to the db
        // this.router.post("/newUser", this.controller.createUser);

        // restaurant endpoints
        this.router.post("/restaurants", this.controller.createRestaurant);
        this.router.get("/restaurants/:id", this.controller.getRestaurant);
        this.router.get("/restaurants/all/all", this.controller.getAllRestaurants); // might change
        this.router.delete("/restaurants/:id", this.controller.deleteRestaurant);
        this.router.put("/restaurants/:id", this.controller.updateRestaurant);

        // review endpoints
        this.router.post("/reviews/:id", this.controller.createReview); // restaurant id
        this.router.get("/reviews/:id", this.controller.getReview);  // restaurant id, rev id (creator id)
        this.router.delete("/reviews/:id", this.controller.deleteReview); // rest id, rev id (creator id)
        this.router.put("/reviews/:id", this.controller.updateReview); // rest id, rev id (creator id)

        this.router.get("/hello", this.controller.getHello);
        this.router.post("/hello", this.controller.postJello);
        return this.router;
    }
}
