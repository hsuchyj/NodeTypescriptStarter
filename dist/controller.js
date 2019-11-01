"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userModel_1 = __importDefault(require("./models/userModel"));
const restaurantModel_1 = __importDefault(require("./models/restaurantModel"));
const mongodb_1 = require("mongodb");
const reviewModel_1 = __importDefault(require("./models/reviewModel"));
class Controller {
    getHello(req, res) {
        res.send("Hello World");
    }
    postJello(req, res) {
        res.send(req.body);
    }
    setupDb() {
        // username:password
        const mongoDb = "mongodb+srv://everyone:cisc474@cluster0-ehxde.mongodb.net/test?retryWrites=true&w=majority";
        mongoose_1.default.connect(mongoDb, { useNewUrlParser: true,
            useUnifiedTopology: true });
        const db = mongoose_1.default.connection;
        db.on("error", console.error.bind(console, "MongoDB Connection error"));
    }
    createUser(req, res) {
        const newUser = new userModel_1.default({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            about: req.body.about
        });
        newUser.save((err, product) => {
            if (err) {
                res.send(err.message);
            }
            else {
                res.send("Welcome " + product.firstName + "! Your registration was");
            }
        });
    }
    readUser(req, res) {
        // if entry exists returns it as json
        userModel_1.default.findById(req.url.split("/")[2], (err, model) => {
            if (err) {
                res.send(err.message);
            }
            else {
                res.send(model);
            }
        });
    }
    updateUser(req, res) {
        userModel_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (err, model) {
            res.send("User has been updated");
        });
    }
    deleteUser(req, res) {
        userModel_1.default.findByIdAndDelete(req.params.id, function (err, model) {
            res.send("User deleted");
        });
    }
    // Restaurant Endpoints
    getRestaurant(req, res) {
        restaurantModel_1.default.findById(req.url.split("/")[2], (err, model) => {
            if (err) {
                res.send(err);
            }
            else {
                res.send(model);
            }
        });
    }
    getAllRestaurants(req, res) {
        restaurantModel_1.default.find({}, (err, model) => {
            if (err) {
                res.send(err);
            }
            else {
                res.send(model);
            }
        });
    }
    updateRestaurant(req, res) {
        restaurantModel_1.default.findByIdAndUpdate(req.url.split("/")[2], req.body, { new: true }, (err, model) => {
            if (err) {
                res.send(err);
            }
            else {
                res.send(model);
            }
        });
    }
    // TODO delete reviews when deleting restaurant
    deleteRestaurant(req, res) {
        restaurantModel_1.default.findByIdAndUpdate(req.url.split("/")[2], req.body, { new: true }, (err, model) => {
            if (err) {
                res.send(err);
            }
            else {
                model.remove();
                res.send("Entry deleted");
            }
        });
    }
    createRestaurant(req, res) {
        const newRestaurant = new restaurantModel_1.default({
            name: req.body.name,
            city: req.body.city,
            state: req.body.state,
            address: req.body.address,
            website: req.body.website,
            description: req.body.description
        });
        newRestaurant.save((err, product) => {
            if (err) {
                res.send(err);
            }
            else {
                const newReview = new reviewModel_1.default({
                    reviews: [],
                    name: req.body.name,
                    restaurantId: mongoose_1.default.Types.ObjectId(product._id)
                });
                newReview.save();
                res.send(product._id);
            }
        });
    }
    // review endpoints
    // TODO check if user already created review
    createReview(req, res) {
        reviewModel_1.default.findOne({ restaurantId: req.url.split("/")[2] }, (error, result) => {
            if (result) {
                const newReview = {
                    creatorId: mongoose_1.default.Types.ObjectId(req.body.creatorId),
                    timestamp: new Date(),
                    text: req.body.text,
                    ratings: req.body.ratings
                };
                reviewModel_1.default.findOneAndUpdate({ restaurantId: req.url.split("/")[2] }, { $push: { reviews: newReview } }, (err) => {
                    if (err) {
                        res.send(err);
                    }
                    else {
                        res.send("Review created");
                    }
                });
            }
            else {
                res.send("Restaurant does not exist");
            }
        });
    }
    getReview(req, res) {
        // if no creatorId, get all reviews from restaurant
        if (!req.query.creatorId) {
            reviewModel_1.default.findOne({ restaurantId: new mongodb_1.ObjectId(req.url.split("/")[2]) }, (err, result) => {
                if (err) {
                    res.send(err);
                }
                else {
                    res.send(result.get("reviews"));
                }
            });
        }
        else {
            reviewModel_1.default.findOne({ "restaurantId": new mongodb_1.ObjectId(req.params.id),
                "reviews.creatorId": new mongodb_1.ObjectId(req.query.creatorId) }, { "reviews.$": 1 }, (err, result) => {
                if (err) {
                    res.send(err);
                }
                else {
                    res.send(result);
                }
            });
        }
    }
    getAllReviews(req, res) {
        reviewModel_1.default.findOne({ restaurantId: new mongodb_1.ObjectId(req.url.split("/")[2]) }, (err, result) => {
            if (err) {
                res.send(err);
            }
            else {
                res.send(result.get("reviews"));
            }
        });
    }
    deleteReview(req, res) {
        reviewModel_1.default.update({ restaurantId: new mongodb_1.ObjectId(req.url.split("/")[2]) }, { $pull: { reviews: { creatorId: new mongodb_1.ObjectId(req.query.creatorId) } } }, { multi: true }, (err, raw) => {
            if (err) {
                res.send(err);
            }
            else {
                res.send("Review deleted");
            }
        });
    }
    updateReview(req, res) {
        reviewModel_1.default.updateOne({ "restaurantId": req.url.split("/")[2],
            "reviews.creatorId": new mongodb_1.ObjectId(req.query.creatorId) }, { $set: {
                "reviews.$.text": req.body.text,
                "reviews.$.ratings": req.body.ratings,
                "reviews.$.timestamp": new Date()
            } }, (err, raw) => {
            if (err) {
                res.send(err);
            }
            else {
                res.send("Review updated");
            }
        });
    }
}
exports.Controller = Controller;
//# sourceMappingURL=controller.js.map