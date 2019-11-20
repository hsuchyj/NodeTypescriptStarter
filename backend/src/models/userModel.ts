import mongoose, { Document, Schema } from "mongoose";
import * as bcrypt from "bcryptjs";
// const bcrypt = require("bcrypt-nodejs");

// Insert interface here
export interface IUser extends Document {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  about: string;
}

// Insert Schema definition here
export const UserSchema = new Schema({
    username: {
      type: String, 
      required: "You must enter a username to register",
      unique: true, // NOTE: WE MUST IMPLEMENT LOGIC TO ENSURE THIS IS MAINTAINED MANUALLY
      maxlength: [20, "Your desired username is too long. Please enter a username with 20 or less characters"],
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: "You must enter a username to register",
      minlength: [8, "You must enter a password with a minimum length of 8"],
      trim: true
    },

    email: {
      type: String,
      required: "You must enter an email address to register",
      unique: true, // NOTE: WE MUST IMPLEMENT LOGIC TO ENSURE THIS IS MAINTAINED MANUALLY
      lowercase: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email address"], // Regex check
      trim: true
    },

    firstName: {
      type: String,
      required: "You must enter a First Name to register",
      trim: true
    },

    lastName: {
      type: String,
      required: "You must enter a Last Name to register",
      trim: true
    },

    about: { // About Me profile section
      type: String,
      maxlength: [255, "About Me section is limited to 255 characters"]
    },

    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date }
  },
  {
    timestamps: true,
  });

  // Pre-save of user to database, hash password if password is modified or new
UserSchema.pre<IUser>("save", function(next: any) {
    const user = this;
    const SALT_FACTOR = 5;

    if (!user.isModified("password")) { return next(); }

    bcrypt.genSalt(SALT_FACTOR, function(err: any, salt: any) {
      if (err) { return next(err); }

      // Modified this from Silber original because expected 3 args not 4 in new bcrypt
      // Silber was using an old version that is deprecated
      bcrypt.hash(user.password, salt, function(err: any, hash: any) {
        if (err) { return next(err); }
        user.password = hash;
        next();
      });
    });
  });

  /* // Commented this out because the function did not match how Silber did it in his Github
     // Trying my own approach
UserSchema.method("comparePassword", function(password: string): boolean {
  if (bcrypt.compareSync(password, this.password)) { return true; }
  return false;
});
*/

// Essentially an exact copy of Silber's implementation
UserSchema.methods.comparePassword = function(candidatePassword: any, cb: any) {
  if (this.password === "*") {cb(null, false); return; }
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) { return cb(err); }

    cb(null, isMatch);
  });
};

// Edited to match our schema and also Silbers code
UserSchema.methods.toJson = function() {
  return {
    _id: this._id,
    username: this.username,
    password: this.password,
    email: this.email,
    firstName: this.firstName,
    lastName: this.lasName,
    about: this.about,
    role: this.role,
    provider: this.provider
  };
};

export default mongoose.model<IUser>("User", UserSchema, "users");
