import mongoose, { Document, Schema } from "mongoose";

// tslint:disable-next-line: no-empty-interface
export interface IMenuItem extends Document {
    itemName: string;
    itemDescription: string;
    price: number;
    category: string;
    cusine: string;
}

const MenuItemSchema: Schema = new Schema ({
    itemName: {
        type: String,
        required: "Please enter a name for your item",
        minlength: 3,
        maxlength: [64, "Length of name is limited to 64 characters"]
    },

    itemDescription: {
        type: String,
        maxlength: [255, "Item description section is limited to 255 characters"]
    },

    price: {
        type: Number,
        required: "Please enter a price for your item"
    },

    category: { // The idea here is to allow user defined arbitrary categories like "Dinner", "Pizza", "Italian", etc
        type: String,
        maxlength: [64, "Length of category name is limited to 64 characters"],
        trim: true
    },

    cuisine: { // The idea here is to optionally enable the user to define a cuisine type in conjuction with the above
        type: String,
        maxlength: [32, "Length of cusine type is limited to 32 characters"],
        trim: true
    }
});

export default mongoose.model<IMenuItem>("Restaurant", MenuItemSchema);
