"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
// NOTE: Need to utilize the .populate method in our CRUD implementations of this schema see below
const RestaurantSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: "You must enter a Restaurant Name to create a restaurant",
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
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User"
    },
});
exports.default = mongoose_1.default.model("Restaurant", RestaurantSchema, "restaurants");
//# sourceMappingURL=restaurantModel.js.map