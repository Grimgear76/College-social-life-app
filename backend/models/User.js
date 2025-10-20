//user database schema
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema (
    {
        firstName: {
            type: String,
            min: 4,
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
            min: 7,
            max: 50,
            unique: true,
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
            min: 5,
            max: 50,
        },
        picturePath: {
            type: String, 
            default: "",
        },
        friends: {
            type: Array, 
            default: [],
        },
        major: String,
        viewedProfile: Number,
        impressions: Number,
    }, {timestamps: true}
);

const User = mongoose.model("User", UserSchema);
export default User;