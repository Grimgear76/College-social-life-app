import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* REGISTER USER */
export const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            userName,
            email,
            password,
            picturePath,
            //friends
        } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            userName,
            email,
            password: passwordHash,
            picturePath,
            //friends,
            //viewedProfile: Math.floor(Math.random() * 10000),
            //impressions: Math.floor(Math.random() * 10000),
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


/* LOGGING IN */
export const login = async (req, res) => {
    try{
        const { identifier, password } = req.body;

        // find user by userName or email
        const user = await User.findOne({ $or: [{ userName: identifier }, { email: identifier }] }); 
        if(!user) return res.status(400).json({msg: "invalid credentials"});

        // compare passwords from client to database
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({msg: "invalid credentials"});

        // sign jwt token
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);


        // convert to object and remove password before sending
        const userObj = user.toObject();
        delete userObj.password;

        res.status(200).json({ token, user: userObj });

    } catch (err) {
        res.status(500).json({ error: err.message});
    }
};