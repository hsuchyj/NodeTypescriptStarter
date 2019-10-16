import * as express from "express";
import * as mongoose from "mongoose";


export class Controller {
    public getHello(req: express.Request, res: express.Response): void {
        res.send("Hello World");
    }
    public postJello(req: express.Request, res: express.Response): void {
        res.send(req.body);
    }

    public setupDb() : void {
        //username:password
        var mongoDb = 'mongodb+srv://everyone:cisc474@cisc474-ehxde.azure.mongodb.net/test?retryWrites=true&w=majority';
        mongoose.connect(mongoDb, 
            {useNewUrlParser: true,
            useUnifiedTopology: true});

        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'MongoDB Connection error'));
    }

    public create(): void
    {
        var userSchema = new mongoose.Schema({
            username: String,
            password:String
          });
        
        var User = mongoose.model('User', userSchema);
        
        var newUser = new User({ username: 'test',password:"password"});
       
        newUser.save();

        console.log("something");
    }
}
