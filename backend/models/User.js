//user database schema
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema (
    {
        firstName: {
            type: String,
            min: 2,
            max: 50,
        },
        lastName: {
            type: String,
            min: 4,
            max: 50,
        },
        userName: {
            type: String,
            required: true,
            unique: true,
            min: 4,
            max: 30,
        },
        email: {
            type: String,
            required: true,
            min: 4,
            max: 50,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            min: 8,
            max: 100,
        },
        picturePath: {
            type: String, 
            default: "",
        },
        friends: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // allows friend references instead of plain strings
        },
        ],
        // questionnaire: {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: "Questionnaire",
        // default: null, // if they skip the questionnaire
        // },
        viewedProfile: Number,
        impressions: Number,
    }, {timestamps: true}
);

const User = mongoose.model("User", UserSchema);
export default User;