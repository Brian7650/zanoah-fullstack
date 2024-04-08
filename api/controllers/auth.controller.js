
import User from "../models/user.model.js";

export const signup = async (req, res, next) => {
    const {username, email, password} = req.body;

    if (!username || !email || !password || username === "" || email === "" || password === "") {
        next(errorHandler(400, "Please fill in all fields"));
        // return res.status(400).json({message: "Please fill in all fields"});
    }

    const newUser = new User({username, email, password});

    try { 
        await newUser.save();
        res.json({message: "User created"});
    } catch (error) {
        next(error);
    } 
   
};