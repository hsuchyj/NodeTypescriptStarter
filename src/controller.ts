import * as express from "express";
import mongoose , {Document, Schema} from "mongoose";

import User, { IUser } from "./models/userModel";
import Restaurant, { IRestaurant } from "./models/restaurantModel";
import { ObjectId } from "mongodb";
import Review, { IReview } from "./models/reviewModel";
import { POINT_CONVERSION_UNCOMPRESSED } from "constants";

export class Controller {
    
    public getHello(req: express.Request, res: express.Response): void {
        res.send("Hello World");
    }
    public postJello(req: express.Request, res: express.Response): void {
        res.send(req.body);
    }

    public setupDb(): void {
        // username:password
        const mongoDb = "mongodb+srv://everyone:cisc474@cluster0-ehxde.mongodb.net/test?retryWrites=true&w=majority";
        mongoose.connect(mongoDb,
            {useNewUrlParser: true,
            useUnifiedTopology: true});

        const db = mongoose.connection;
        db.on("error", console.error.bind(console, "MongoDB Connection error"));
    }

    public createUser(req: express.Request, res: express.Response): void {

        const newUser: IUser = new User({ 
            username: req.body.username, 
            password: req.body.password,
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            about: req.body.about
        });
        
        newUser.save( (err, product) => {
            if (err) {
                res.send(err.message);
            } else {
                res.send("Welcome " + product.firstName + "! Your registration was");
            }
        });
    }
    
    public readUser(req: express.Request, res: express.Response): void {
        // if entry exists returns it as json
        User.findById(req.url.split("/")[2], (err, model) => {
            if (err) {
                res.send(err.message);
            } else {
                res.send(model);
            }
        });
    }

    public updateUser(req: express.Request, res: express.Response): void {
        User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, model) {
            res.send("User has been updated");
        });
    }

    public deleteUser(req: express.Request, res: express.Response): void {
        User.findByIdAndDelete(req.params.id, function(err, model) {
            res.send("User deleted");
        });
    }

    // Restaurant Endpoints
    public getRestaurant(req: express.Request, res: express.Response): void {
        Restaurant.findById( req.url.split("/")[2], (err, model) => {
            if (err) {
                res.send(err);
            } else {
                res.send(model);
            }
        });
    }

    public getAllRestaurants(req: express.Request, res: express.Response): void {
        Restaurant.find( {} , (err, model) => {
            if (err) {
                res.send(err);
            } else {
                res.send(model);
            }
        });
    }

    public updateRestaurant(req: express.Request, res: express.Response): void {
        Restaurant.findByIdAndUpdate(req.url.split("/")[2], req.body, { new: true }, (err, model) => {
            if (err) {
                res.send(err);
            } else {
                res.send(model);
            }
        });
    }

    // TODO delete reviews when deleting restaurant
    public deleteRestaurant(req: express.Request, res: express.Response): void {
        Restaurant.findByIdAndUpdate(req.url.split("/")[2], req.body, { new: true }, (err, model) => {
            if (err) {
                res.send(err);
            } else {
                model.remove();
                res.send("Entry deleted");
            }
        });
    }

    public createRestaurant(req: express.Request, res: express.Response): void {
        const newRestaurant: IRestaurant = new Restaurant({
            name: req.body.name,
            city: req.body.city,
            state: req.body.state,
            address: req.body.address,
            website: req.body.website,
            description: req.body.description
        });
        newRestaurant.save( (err, product) => {
            if (err) {
                res.send(err);
            } else {
                const newReview: IReview = new Review({
                    reviews: [],
                    name: req.body.name,
                    restaurantId: mongoose.Types.ObjectId(product._id)
                });
                newReview.save();
                res.send(product._id);
            }
        });
    }

    // review endpoints
    // TODO check if user already created review
    public createReview(req: express.Request, res: express.Response): void {
        Review.findOne({ restaurantId: req.url.split("/")[2] } , (error, result) => {
            if (result) {
                const newReview = {
                    creatorId: mongoose.Types.ObjectId(req.body.creatorId),
                    timestamp: new Date(),
                    text: req.body.text,
                    ratings: req.body.ratings
                };

                Review.findOneAndUpdate({restaurantId: req.url.split("/")[2]}, 
                    { $push: { reviews: newReview }}, 
                    (err) => {
                        if (err) {
                            res.send(err);
                        } else {
                            res.send("Review created");
                        }
                    });
            } else {
                res.send("Restaurant does not exist");
            }});
    }

    public getReview(req: express.Request, res: express.Response): void {
        // if no creatorId, get all reviews from restaurant
        if (!req.query.creatorId) {
            Review.findOne({restaurantId: new ObjectId(req.url.split("/")[2])}, (err, result) => {
                if (err) {
                    res.send(err);
                } else {
                    res.send(result.get("reviews"));
                }
            });
        } else {
            Review.findOne(
                { "restaurantId": new ObjectId(req.params.id),
                    "reviews.creatorId": new ObjectId(req.query.creatorId) },
                { "reviews.$": 1 }, 
                (err, result) => {
                    if (err) {
                        res.send(err);
                    } else {
                        res.send(result);
                    }
                });
        }
    }

    public getAllReviews(req: express.Request, res: express.Response): void {
        Review.findOne({restaurantId: new ObjectId(req.url.split("/")[2])}, (err, result) => {
            if (err) {
                res.send(err);
            } else {
                res.send(result.get("reviews"));
            }
        });
    }

    public deleteReview(req: express.Request, res: express.Response): void {
        Review.update({restaurantId: new ObjectId(req.url.split("/")[2])}, 
            { $pull: { reviews: { creatorId: new ObjectId(req.query.creatorId) }}},
            { multi: true }, 
            (err, raw) => {
                if (err) {
                    res.send(err);
                } else {
                    res.send("Review deleted");
                }
            });
    }

    public updateReview(req: express.Request, res: express.Response): void {
        Review.updateOne({"restaurantId": req.url.split("/")[2],
        "reviews.creatorId": new ObjectId(req.query.creatorId)}, 
            { $set: {
                "reviews.$.text": req.body.text,
                "reviews.$.ratings": req.body.ratings,
                "reviews.$.timestamp": new Date()
            }},
            (err, raw) => {
                if (err) {
                    res.send(err);
                } else {
                    res.send("Review updated");
                }
            });
    }

}
