import mongoose, { Document, Schema } from "mongoose";

// Insert interface exports here
export interface IUser extends Document {
    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    about: string;
}

// Insert Schema definitions here
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
    }
  });

const RestaurantSchema: Schema = new Schema({
  name: {
    type: String,
    required: "You must enter a Restaurant Name to create a restaurant",
    unique: true, // NOTE: WE MUST IMPLEMENT LOGIC TO ENSURE THIS IS MAINTAINED MANUALLY
  },

  city: {
    type: String,
    required: "You must enter a City to create a restaurant",
    trim: true
  },

  state: {
    type: String,
    required: "You must enter a State to create a restaurant",
    trim: true
  },

  // Address does NOT have a required field because all we really need to do sorting by location is City and State
  address: { 
    type: String,
    match: [/^\s*\S+(?:\s+\S+){2}/, "Please enter a valid Street Address"] // REGEX to test validity
  },

  website: {
    type: String,
    match: [/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi, "Please enter a valid Web Address"] // REGEX to test validity
  },

  description: {
    type: String,
    maxlength: [255, "Restaurant description section is limited to 255 characters"],
  },

  createdBy: {
    
  }
});

const ReviewSchema: Schema = new Schema ({
  // TODO
});

const MenuSchema: Schema = new Schema ({
  // TODO
});

export default mongoose.model<IUser>("User", UserSchema);
