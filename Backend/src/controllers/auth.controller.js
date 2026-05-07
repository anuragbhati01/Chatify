import { generateToken } from "../lib/utils.js";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { sendWelcomeEmail } from "../emails/emailHandlers.js";
import "dotenv/config"
import { ENV } from "../lib/env.js";

export const signup = async (req , res) => {
    const {fullName, email, password} = req.body;

    try {
        if(!fullName || !email || !password){
            res.status(400).json({message : "All fields are required!"});
        }

        if(password.length < 6){
            res.status(400).json({message: "password length should be greater than 6"});
        }

        // Email validation 
        // Regular expression for validating email format

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if(!emailRegex.test(email)){
            res.status(400).json({message: "Email is not valid"});
        }

        const existingUser = await User.findOne({email});

        if(existingUser) return res.status(400).json({message: "Email already registered"});

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        });

        if(newUser){
            const savedUser = await newUser.save();
            generateToken(savedUser._id, res);

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            });

            // Sending welcome message
            try {
                await sendWelcomeEmail(savedUser.email, savedUser.fullName, ENV.CLIENT_URL)
            } catch (error) {
                console.error("Error sending welcome email: ", error);
            }
        }
        else{
            res.status(400).json({message: "Invalid user data"});
        }

    } catch (error) {
        console.log("Error in signup controller : ", error)
        res.status(500).json({message: "Server error", error: error.message});
    }
}