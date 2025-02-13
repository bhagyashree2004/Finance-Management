import express from "express";
import { addExpense, deleteExpence, getExpense } from "../controllers/expenseManagement.js";
import { protectRoute } from "../middleware/authCheck.js";
import { addIncome, getIncome } from "../controllers/incomeManagement.js";
import { addBudget, getBudgets, getMonthly } from "../controllers/budgetManagement.js";
import upload from "../middleware/uploadMiddleware.js";
import { bulkUploadExpenses } from "../controllers/expenseManagement.js";
import { chartbymonth } from "../controllers/expenseManagement.js";
const router = express.Router();

router.post("/addExpense",protectRoute, addExpense);
router.get("/getExpense",protectRoute, getExpense);
router.get("/getmonthly",protectRoute, getMonthly);
router.delete("/deleteexpense/:id",protectRoute, deleteExpence);
router.get("/chartbymonth",protectRoute, chartbymonth);
router.post("/bulkUploadExpenses", protectRoute, upload.single("file"), bulkUploadExpenses);

router.post("/addIncome",protectRoute, addIncome);
router.get("/getIncome",protectRoute, getIncome);

router.post("/addBudget",protectRoute, addBudget);
router.get("/getBudget",protectRoute, getBudgets);


export default router;