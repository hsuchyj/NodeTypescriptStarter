import * as express from "express";
import mongoose , {Document, Schema} from "mongoose";
// import {model}
// const User = require("../src/model.ts");
import User, { IUser } from "./models/userModel";
import Restaurant, { IRestaurant } from "./models/restaurantModel";
import { ObjectId } from "mongodb";
import Review, { IReview } from "./models/reviewModel";

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
        // console.log(req.body.user);
        /*
        this is the body to be submitted

        {
            "user":"whatever",
            "password":"okiedokie"
        }
        */
        res.send("new user created");
        const newUser: IUser = new User({ username: req.body.user, password: req.body.password});
        newUser.save();
    }
    
    public readUser(req: express.Request, res: express.Response): void {
        // if entry exists returns it as json
        User.findById(req.params.id, "username password", { lean: true }, 
            function(err, doc) {
                if (doc == null) {
                    res.send("User does not exist");
                } else {
                    res.json(doc);
                }
            });

        /*
        check if entry exists

        const result = User.exists({username:"rick and morty"});
        result.then(function(result2) {
            console.log(result2) // "Some User token"
         })*/
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
                { $push: { reviews: newReview }}, (err, model) => {
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
        Review.findOne(
            { "restaurantId": new ObjectId(req.url.split("/")[2]),
                "reviews.creatorId": new ObjectId(req.url.split("/")[3]) }, 
            { "reviews.$": 1 }, 
            (err, result) => {
                if (err) {
                    res.send(err);
                } else {
                    console.log(result);
                    res.send(result);
                }
            });
    }

    public getAllReviews(req: express.Request, res: express.Response): void {
        Review.findOne({restaurantId: new ObjectId(req.url.split("/")[2])}, (err, result) => {
            if (err) {
                res.send(err);
            } else {
                res.send(result);
            }
        });
    }

    public deleteReview(req: express.Request, res: express.Response): void {
        Review.update({restaurantId: req.url.split("/")[2]}, 
            { $pull: { reviews: { creatorId: new ObjectId(req.url.split("/")[3]) }}},
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
        Review.update({"restaurantId": req.url.split("/")[2],
        "reviews.creatorId": new ObjectId(req.url.split("/")[3])}, 
            {"reviews.$": req.body},
            (err, raw) => {
                if (err) {
                    res.send(err);
                } else {
                    res.send("Review updated");
                }
            });
    }

}
