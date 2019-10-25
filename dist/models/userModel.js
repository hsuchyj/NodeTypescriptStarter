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
// Insert Schema definition here
const UserSchema = new mongoose_1.Schema({
    username: {
        type: String,
        //required: "You must enter a username to register",
        unique: true,
        maxlength: [20, "Your desired username is too long. Please enter a username with 20 or less characters"],
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        //required: "You must enter a username to register",
        minlength: [8, "You must enter a password with a minimum length of 8"],
        trim: true
    },
    email: {
        type: String,
        //required: "You must enter an email address to register",
        unique: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email address"],
        trim: true
    },
    firstName: {
        type: String,
        //required: "You must enter a First Name to register",
        trim: true
    },
    lastName: {
        type: String,
        //required: "You must enter a Last Name to register",
        trim: true
    },
    about: {
        type: String,
        maxlength: [255, "About Me section is limited to 255 characters"]
    }
});
exports.default = mongoose_1.default.model("User", UserSchema, "users");
//# sourceMappingURL=userModel.js.map