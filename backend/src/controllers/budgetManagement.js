import Budget from "../models/budget.js";

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