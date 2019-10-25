import * as express from "express";
import mongoose , {Document, Schema} from "mongoose";
// import {model}
// const User = require("../src/model.ts");
import User, { IUser } from "./models/userModel";
import Restaurant, { IRestaurant } from "./models/restaurantModel";

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

    // TODO update the User to the new schema
    public createUser(req: express.Request, res: express.Response): void {
        // console.log(req.body.user);
        /*
        ^^^^^^^
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
        // console.log(req.body);
        /*
        ^^^^^^^
        {
            "user":"whatever",
            "password":"okiedokie"
        }
        */
        res.send("new user created");
        const newUser: IUser = new User({ username: req.body.user, password: req.body.password});
        newUser.save(); 
    }

    public getRestaurant(req: express.Request, res: express.Response): void {
        res.send("GET");
    }

    public updateRestaurant(req: express.Request, res: express.Response): void {
        res.send("PUT");
    }

    public deleteRestaurant(req: express.Request, res: express.Response): void {
        res.send("DELETE");
    }

    public createRestaurant(req: express.Request, res: express.Response): void {
        // res.send("POST");
        const newRestaurant: IRestaurant = new Restaurant({ 
            name: req.body.name,
            city: req.body.city,
            state: req.body.state,
            address: req.body.address,
            website: req.body.website,
            description: req.body.description
        });
        newRestaurant.save();
        res.send(req.body);
    }
}
