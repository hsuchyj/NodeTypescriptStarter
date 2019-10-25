import mongoose, { Document, Schema } from "mongoose";

// tslint:disable-next-line: no-empty-interface
export interface IReview extends Document {
    // TODO
}

const ReviewSchema: Schema = new Schema ({
    // TODO
});

export default mongoose.model<IReview>("User", ReviewSchema);
