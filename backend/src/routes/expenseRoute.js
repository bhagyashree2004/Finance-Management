import express from "express";
import { addExpense, getExpense } from "../controllers/expenseManagement.js";
import { protectRoute } from "../middleware/authCheck.js";
import { addIncome, getIncome } from "../controllers/incomeManagement.js";
import { addBudget, getBudgets } from "../controllers/budgetManagement.js";
import upload from "../middleware/uploadMiddleware.js";
import { bulkUploadExpenses } from "../controllers/expenseManagement.js";
const router = express.Router();

router.post("/addExpense",protectRoute, addExpense);
router.get("/getExpense",protectRoute, getExpense);
router.post("/bulkUploadExpenses", protectRoute, upload.single("file"), bulkUploadExpenses);

router.post("/addIncome",protectRoute, addIncome);
router.get("/getIncome",protectRoute, getIncome);

router.post("/addBudget",protectRoute, addBudget);
router.get("/getBudget",protectRoute, getBudgets);


export default router;