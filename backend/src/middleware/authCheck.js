import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const protectRoute = async (req,res,next) => {
    try{
        const token = req.cookies.jwt;
        if (!token){
            return res.status(401).json({message:"Unauthorized - No Token Provided"});
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        if(!decoded){
            res.status(401).json({message:"Unauthorized - Invalid Token"});
        }

        const user = await User.findById(decoded.userId).select("-password");

        if(!user){
            res.status(401).json({message:"User not found"});
        }

        req.user = user;

        next();
    } catch(err){
        console.log("Error in protectRoute middlaware",err);
        res.status(500).json({message:"Internal Server Error"});
    }
}