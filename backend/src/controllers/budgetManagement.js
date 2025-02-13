import Budget from "../models/budget.js";
import Expense from "../models/expense.js";
import Income from "../models/income.js";

// Controller to add a budget
export const addBudget = async (req, res) => {
    try {
        const { category, amount } = req.body;
        const userId = req.user._id;  // Extract user ID from authenticated request

        if (!category || !amount) {
            return res.status(400).json({ message: "Category and amount are required" });
        }

        const newBudget = new Budget({
            userId,
            category,
            amount
        });

        await newBudget.save();
        res.status(201).json({ message: "Budget added successfully", budget: newBudget });
    } catch (err) {
        console.error("Error adding budget:", err.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Controller to get all budgets for a user
export const getBudgets = async (req, res) => {
    try {
        const userId = req.user._id;
        const budgets = await Budget.find({ userId });

        res.status(200).json(budgets);
    } catch (err) {
        console.error("Error fetching budgets:", err.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getMonthly =  async (req, res) => {
    try {
        const userId = req.user._id;
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();

        // Fetch income for the current month
        const totalIncome = await Income.aggregate([
            {
                $match: {
                    userId: userId,
                    date: {
                        $gte: new Date(currentYear, currentMonth, 1),
                        $lt: new Date(currentYear, currentMonth + 1, 1)
                    }
                }
            },
            {
                $group: { _id: null, total: { $sum: "$amount" } }
            }
        ]);

        // Fetch expenses for the current month
        const totalExpense = await Expense.aggregate([
            {
                $match: {
                    userId: userId,
                    date: {
                        $gte: new Date(currentYear, currentMonth, 1),
                        $lt: new Date(currentYear, currentMonth + 1, 1)
                    }
                }
            },
            {
                $group: { _id: null, total: { $sum: "$amount" } }
            }
        ]);

        const income = totalIncome.length > 0 ? totalIncome[0].total : 0;
        const expense = totalExpense.length > 0 ? totalExpense[0].total : 0;

        res.json({
            totalIncome: income,
            totalExpense: expense,
            totalBudget: income - expense
        });

    } catch (error) {
        console.error("Error fetching budget summary:", error);
        res.status(500).json({ message: "Server error" });
    }
};