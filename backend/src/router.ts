import * as express from "express";
import {Controller} from "./controller";
import * as authentication from "./authentication"; // added this to get authentication methods
// mport * as passportService from "./security/passport";
const passportService = require("./security/passport");

export class ApiRouter {
    private router: express.Router = express.Router();
    private controller: Controller = new Controller();
    private passportService: any = passportService;
    private authentication: any = authentication;

    // Creates the routes for this router and returns a populated router object
    public getRouter(): express.Router {

        this.controller.setupDb();
        // go to http://localhost:3000/api/users to add a user to the db

        // We don't need this endpoint anymore because we have a registration endpoint
        // However I will leave it for now
        this.router.post("/users", this.controller.createUser); // unprotected
        this.router.get("/users/:id", this.passportService.requireAuth, this.controller.readUser); // protected

        // Right now any authorized user can update the details of any user from this endpoint with their token
        // Ideally we would want to check if the user passing the token in is actually the user being updated
        // For now I think this is fine though
        this.router.put("/users/:id", this.passportService.requireAuth, this.controller.updateUser); // protected

        // Same as above, any authorized user can issue a delete on any other user by ID
        // Ideally we would want to check if the user passing the token in is actually the user being deleted
        // Or require some higher tier of authorization
        this.router.delete("/users/:id", this.passportService.requireAuth, this.controller.deleteUser); // protected

        // Authentication stuff. All of these are tested and working. 
        // http://localhost:3000/api/[authorize][register][login]
        this.router.get("/authorize", this.passportService.requireAuth, this.authentication.authorize); // protected
        this.router.post("/register", this.authentication.register); // unprotected
        this.router.post("/login", this.authentication.login); // unprotected

        // restaurant endpoints
        this.router.post("/restaurants", this.passportService.requireAuth, this.controller.createRestaurant); 
        this.router.get("/restaurants/:id", this.controller.getRestaurant); // unprotected
        this.router.get("/restaurants/all/all", this.controller.getAllRestaurants); // unprotected

        // Same issue present here as above with user endpoints. Any authorized user can delete or update any restaurant
        // Ideally we would want to check if the user passing the token in is actually the user who created
        this.router.delete("/restaurants/:id", this.passportService.requireAuth, this.controller.deleteRestaurant); 
        this.router.put("/restaurants/:id", this.passportService.requireAuth, this.controller.updateRestaurant); 

        // review endpoints
        this.router.post("/reviews/:id", this.passportService.requireAuth, this.controller.createReview); 
        this.router.get("/reviews/:id", this.controller.getReview);  // restaurant id, rev id (creator id) + unprotected

        // Same issue present here as above with user endpoints. Any authorized user can delete or update any review
        // Ideally we would want to check if the user passing the token in is actually the user who created the review
        this.router.delete("/reviews/:id", this.passportService.requireAuth, this.controller.deleteReview); 
        this.router.put("/reviews/:id", this.passportService.requireAuth, this.controller.updateReview); 

        this.router.get("/hello", this.controller.getHello);
        this.router.post("/hello", this.controller.postJello);
        return this.router;
    }
}
