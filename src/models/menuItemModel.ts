import mongoose, { Document, Schema } from "mongoose";

// tslint:disable-next-line: no-empty-interface
export interface IMenuItem extends Document {
    // TODO
}

const MenuItemSchema: Schema = new Schema ({
    // TODO
});

export default mongoose.model<IMenuItem>("Restaurant", MenuItemSchema);
