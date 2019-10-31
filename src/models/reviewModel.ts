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
