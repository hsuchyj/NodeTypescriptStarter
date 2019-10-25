import mongoose, { Document, Schema } from "mongoose";

export interface IRestaurant extends Document {
    name: string;
    city: string;
    state: string;
    address: string;
    website: string;
    description: string;
    createdBy: mongoose.Schema.Types.ObjectId; // Unsure if this is the correct format
  }

    // NOTE: Need to utilize the .populate method in our CRUD implementations of this schema see below
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
  
    // This essentially allows us to nest a user object from the collection USER as the data for this field
    // We will need to use the .populate method to fill this field dynamically when we implement CRUD methods
     createdBy: {
       type: mongoose.Schema.Types.ObjectId,
       ref: "User"
    }
   }
  );

export default mongoose.model<IRestaurant>("Restaurant", RestaurantSchema);
