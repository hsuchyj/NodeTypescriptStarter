import mongoose, { Document, Schema } from "mongoose";

// Insert interface exports here
export interface IUser extends Document {
    username: string;
    password: string;
    email: string;
    firstname: string;
    lastname: string;
    about: string;
  }

const UserSchema: Schema = new Schema({
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

    firstname: {
      type: String,
      required: "You must enter a First Name to register",
      trim: true
    },

    lastname: {
      type: String,
      required: "You must enter a Last Name to register",
      trim: true
    },

    about: { // About Me profile section
      type: String,
      maxlength: [255, "About Me section is limited to 255 characters"],
    }
  });

const RestaurantSchema: Schema = new Schema({
  // TODO
});

const ReviewSchema: Schema = new Schema ({
  // TODO
});

export default mongoose.model<IUser>("User", UserSchema);
