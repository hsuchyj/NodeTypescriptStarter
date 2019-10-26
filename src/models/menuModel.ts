import mongoose, { Document, Schema } from "mongoose";

// tslint:disable-next-line: no-empty-interface
export interface IMenu extends Document {
    // TODO
}

const MenuSchema: Schema = new Schema ({
    // TODO
});

export default mongoose.model<IMenu>("Restaurant", MenuSchema);
