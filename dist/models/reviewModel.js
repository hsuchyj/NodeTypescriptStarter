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
const ReviewSchema = new mongoose_1.Schema({
    restaurantId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
exports.default = mongoose_1.default.model("Review", ReviewSchema, "reviews");
//# sourceMappingURL=reviewModel.js.map