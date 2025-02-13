import express from 'express';
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from './lib/db.js';
import authRoutes from "./routes/authRoutes.js";
import expenseRoutes from "./routes/expenseRoute.js";
import chartRoute from "./routes/chartRoute.js";
import cors from "cors"

const app = express();
dotenv.config();

const PORT = process.env.PORT;

app.use(express.json({ limit: "10mb" })); 
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));


app.use("/api/auth",authRoutes);
app.use("/api/expenseRoute",expenseRoutes);
app.use("/api/charRoute", chartRoute);

app.listen(PORT,() => {
    console.log(`Server is running on PORT http://localhost:${PORT}`)
    connectDB();
});