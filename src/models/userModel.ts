import mongoose, { Document, Schema } from "mongoose";
const bcrypt = require('bcrypt-nodejs');

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
      // required: "You must enter a username to register",
      required: [true, "You must enter a username to register"],
      unique: true, // NOTE: WE MUST IMPLEMENT LOGIC TO ENSURE THIS IS MAINTAINED MANUALLY
      maxlength: [20, "Your desired username is too long. Please enter a username with 20 or less characters"],
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      // required: "You must enter a username to register",
      required: [true, "You must enter a password to register"],
      minlength: [8, "You must enter a password with a minimum length of 8"],
      trim: true
    },

    email: {
      type: String,
      // required: "You must enter an email address to register",
      unique: true, // NOTE: WE MUST IMPLEMENT LOGIC TO ENSURE THIS IS MAINTAINED MANUALLY
      lowercase: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email address"], // Regex check
      trim: true
    },

    firstName: {
      type: String,
      // required: "You must enter a First Name to register",
      required: [true, "You must enter your full name to register"],
      trim: true
    },

    lastName: {
      type: String,
      // required: "You must enter a Last Name to register",
      required: [true, "You must enter your full name to register"],
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
  UserSchema.pre<IUser>('save', function (next: any) {
    const user = this,
    SALT_FACTOR = 5;

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_FACTOR, function (err:any, salt: any) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, null, function (err: any, hash: any) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  });

UserSchema.method('comparePassword', function (password: String): boolean {
  if (bcrypt.compareSync(password, this.password)) return true;
  return false;
});

UserSchema.methods.toJson = function () {
  return {
    username: this.username,
    password: this.password,
    email: this.email,
    firstName: this.firstName,
    lastName: this.lasName,
    about: this.about
  }
}

export default mongoose.model<IUser>("User", UserSchema, "users");