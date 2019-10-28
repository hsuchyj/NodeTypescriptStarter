import mongoose, { Document, Schema } from "mongoose";

// tslint:disable-next-line: no-empty-interface
export interface IReview extends Document {
    restaurant: mongoose.Schema.Types.ObjectId;
    creator: mongoose.Schema.Types.ObjectId;
    contents: string;
    rating: number;
}

const ReviewSchema: Schema = new Schema ({
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant"
    }, 

    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    contents: {
        type: String,
        maxlength: [255, "Reviews are limited in size to 255 characters"],
        required: "You must provide a review"
    },

    rating: {
        type: Number,
        max: 5,
        min: 1,
        required: "You must provide a rating from 1 to 5"
    }

});

// Might want to have reviews in the restaurant collection
// And anchoring them on the restaurant but not sure both could work
export default mongoose.model<IReview>("User", ReviewSchema);
