import * as express from "express";
import mongoose , {Schema,Document} from "mongoose";
//import {model}
//const User = require("../src/model.ts");
import User, { IUser } from "./model";

export class Controller {

    
    public getHello(req: express.Request, res: express.Response): void {
        res.send("Hello World");
    }
    public postJello(req: express.Request, res: express.Response): void {
        res.send(req.body);
    }

    public setupDb() : void {
        //username:password
        var mongoDb = 'mongodb+srv://everyone:cisc474@cluster0-ehxde.mongodb.net/test?retryWrites=true&w=majority';
        mongoose.connect(mongoDb, 
            {useNewUrlParser: true,
            useUnifiedTopology: true});

        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'MongoDB Connection error'));
    }

    public createUser(req: express.Request, res: express.Response): void
    {
        console.log(req.body);
        var rand = Math.floor(Math.random() * 240) + 80;
        const newUser: IUser = new User({ username: 'test'+rand,password:"password"});
       
        newUser.save();
        
        console.log("something");
    }
}
