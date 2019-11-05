import * as express from "express";
import mongoose , {Document, Schema} from "mongoose";

import User, { IUser } from "./models/userModel";
import Restaurant, { IRestaurant } from "./models/restaurantModel";
import { ObjectId } from "mongodb";
import Review, { IReview } from "./models/reviewModel";
import { fstat } from "fs";

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
        User.findByIdAndUpdate(req.url.split("/")[2], req.body, { new: true}, (err, model) => {
            if (err) {
                res.send(err.message);
            } else {
                res.send(model);
            }
        });
    }

    public deleteUser(req: express.Request, res: express.Response): void {
        User.findByIdAndUpdate(req.url.split("/")[2], req.body, {new: true}, (err, model) => {
            if (err) {
                res.send(err.message);
            } else {
                model.remove();
                res.send("User deleted successfully");
            }
        });
    }

    // Restaurant Endpoints
    public getRestaurant(req: express.Request, res: express.Response): void {
        Restaurant.findById( req.params.id, (err, model) => {
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
        Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, model) => {
            if (err) {
                res.send(err);
            } else {
                res.send(model);
            }
        });
    }

    public deleteRestaurant(req: express.Request, res: express.Response): void {
        Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, model) => {
            if (err) {
                res.send(err);
            } else {
                model.remove();
                res.send("Restaurant deleted and reviews erased");
            }
        });

        Review.findOneAndDelete({ restaurantId: req.params.id }, (err, result) => {
            if (err) {
                res.send(err);
            } else {
                result.remove();
            }
        });
    }

    public createRestaurant(req: express.Request, res: express.Response): void {

            const newRestaurant: IRestaurant = new Restaurant({
                alias: req.body.alias,
                name: req.body.name,
                image_url: req.body.image_url,
                review_count: 0,
                categories: req.body.categories,
                transactions: req.body.transactions,
                rating: req.body.rating,
                coordinates: req.body.coordinates,
                location: req.body.location,
                phone: req.body.phone,
                display_phone: req.body.display_phone
            });
            newRestaurant.save( (err, product) => {
                if (err) {
                    res.send(err);
                } else {
                    const newReview: IReview = new Review({
                        reviews: [],
                        alias: req.body.alias,
                        restaurantId: mongoose.Types.ObjectId(product._id)
                    });
                    newReview.save();
                    res.send(product);
                }
            });
    }

    // review endpoints
    // TODO check if user already created review
    // TODO increment review count of restaurant after a review is created
    public createReview(req: express.Request, res: express.Response): void {

        Review.findOne({ restaurantId: req.params.id } , (error, result) => {
            if (result) {
                const newReview = {
                    creatorId: mongoose.Types.ObjectId(req.body.creatorId),
                    timestamp: new Date(),
                    text: req.body.text,
                    ratings: req.body.ratings
                };

                Review.findOneAndUpdate({restaurantId: req.params.id}, 
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
            Review.findOne({restaurantId: new ObjectId(req.params.id)}, (err, result) => {
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

    public deleteReview(req: express.Request, res: express.Response): void {
        Review.update({restaurantId: new ObjectId(req.params.id)}, 
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
        Review.updateOne({"restaurantId": req.params.id,
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
