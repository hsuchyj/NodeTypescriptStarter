import { Document, Schema } from "mongoose";
import * as mongoose from "mongoose"; 

export interface IRestaurant extends Document {
  alias: string;  
  name: string;
  image_url: string;
  review_count: number;
  categories: Array<{ 
    alias: string,
    title: string
  }>;
  transactions: string[];
  rating: number;
  coordinate: {
    latitude: number,
    longitude: number
  };
  location: {
    address1: string,
    address2: string,
    address3: string,
    city: string,
    zip_code: string,
    country: string,
    state: string,
    display_address: string[]
  };
  phone: string;
  display_phone: string;
}

    // NOTE: Need to utilize the .populate method in our CRUD implementations of this schema see below
const RestaurantSchema: Schema = new Schema({

  alias: {
    type: String
  },

  name: {
    type: String
  },

  image_url: {
    type: String
  },

  review_count: {
    type: Number
  },

  categories: {
    type: Array
  },

  transactions: {
    type: Array
  },

  rating: {
    type: Number
  }, 

  coordinates: {
    type: Object
  },

  location: {
    type: Object
  },

  phone: {
    type: String
  },

  display_phone: {
    type: String
  },

});

export default mongoose.model<IRestaurant>("Restaurant", RestaurantSchema, "restaurants");
