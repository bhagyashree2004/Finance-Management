import mongoose from "mongoose";

export const connectDB = async () => {
    try{
        const con = await mongoose.connect(process.env.MONGODB_URL);
        console.log(`MongoDB connected: ${con.connection.host}`);
    }catch(err){
        console.log("Error connecting MongoDB",err);
    }
}