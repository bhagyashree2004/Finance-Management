import { generateToken } from "../lib/utils.js";
import User from "../models/user.js";

export const signup = async (req,res) => {
    const {fullName,email,password,confirmPassword} = req.body;
    try{
        // hash password
        if (!fullName || !email || !password || !confirmPassword){
            return res.status(400).json({message:"All fields are required"});
        }
        if (password.length < 6){
            return res.status(400).json({message:"Password must be at leat 6 characters"});
        }

        const user = await User.findOne({email});

        if (user) return res.status(400).json({message:"Email already exists"});


        const newUser = new User({
            fullName:fullName,
            email:email,
            password:password,
            confirmPassword:confirmPassword
        })

        if(newUser){
            //generate jwt token
            generateToken(newUser._id,res)
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                email: newUser.email,
                fullName: newUser.fullname
            })
        }
        else{
            res.status(400).json({message:"Invalid user data"});
        }
    }catch(err){
        console.log("Error in signup controller",err.message);
        res.status(500).json({message:"Internal Server Error"})
    }
};