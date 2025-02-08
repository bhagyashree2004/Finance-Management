import express from 'express';
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from './lib/db.js';
import authRoutes from "./routes/authRoutes.js";


const app = express();
dotenv.config();

const PORT = process.env.PORT;

app.use(express.json({ limit: "10mb" })); 
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());

app.use("/api/auth",authRoutes);

app.listen(PORT,() => {
    console.log(`Server is running on PORT http://localhost:${PORT}`)
    connectDB();
});