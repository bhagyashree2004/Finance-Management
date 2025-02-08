import { generateToken } from "../lib/utils.js";
import User from "../models/user.js";

export const signup = async (req,res) => {
    const {fullName,email,password,confirmPassword} = req.body;
    try{
        // hash password
        if (!fullName || !email || !password || !confirmPassword){
            return res.status(400).json({message:"All fields are required"});
        }
        if(password !== confirmPassword){
            return res.status(400).json({message:"Password and confirm password should match"})
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

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Directly comparing the passwords (not recommended in production)
        if (password !== user.password) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Generate and send the JWT token if passwords match
        generateToken(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
          
        });
    } catch (err) {
        console.log("Error in login controller:", err.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const checkAuth = (req,res) => {
    try{
        res.status(200).json(req.user);
    } catch(err){
        console.log("Error in checkAuth controller",err)
        res.status(500).json({message: "Internal Server Error"});
    }
}