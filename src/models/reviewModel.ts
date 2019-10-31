import mongoose, { Document, Schema } from "mongoose";

// tslint:disable-next-line: no-empty-interface
export interface IReview extends Document {
    creatorId: mongoose.Schema.Types.ObjectId;
    timestamp: Date;
    text: string;
    ratings: {
        overall: number,
        food: number,
        drinksAndBar: number,
        price: number,
        service: number,
        specialsAndHappyHour: number,
        music: number,
        restrooms: number
    };
}

/*
const ReviewSchema: Schema = new Schema ({
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant"
    }, 

    creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    timestamp: {
        type: Date,
        ref: "Timestamp"
    },

    text: {
        type: String,
        maxlength: [255, "Reviews are limited in size to 255 characters"],
        required: "You must provide a review",
        ref: "Text"
    },

    ratings: {
        type: Object
        // required: "You must provide a rating from 1 to 5"
    }

});
*/

const ReviewSchema: Schema = new Schema ({
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "RestaurantId"
    },

    name: {
        type: String
    },

    reviews: {
        type: Array
    }
});

// Might want to have reviews in the restaurant collection
// And anchoring them on the restaurant but not sure both could work
export default mongoose.model<IReview>("Review", ReviewSchema, "reviews");
