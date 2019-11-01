/*
import mongoose, { Document, Schema } from "mongoose";

// tslint:disable-next-line: no-empty-interface
export interface IMenu extends Document {
    title: string;
    restaurant: mongoose.Schema.Types.ObjectId;
    menuItems: [mongoose.Schema.Types.ObjectId];
}

const MenuSchema: Schema = new Schema ({
    title: {
        type: String,
        required: "Enter a title for your menu",
        maxlength: [64, "Menu Title is limited to 64 characters"]
    },

    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true
    },

    menuItems: {
        type: [mongoose.Schema.Types.ObjectId], // Array of menuItems
        ref: "Restaurant",
        required: "You must enter at least one menu item"
    }

});

export default mongoose.model<IMenu>("Restaurant", MenuSchema);
*/
