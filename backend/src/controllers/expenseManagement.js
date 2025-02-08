import Expense from "../models/expense.js";

export const addExpense = async (req, res) => {
    try {
        const { amount, category, date, description, currency } = req.body;
        const userId = req.user._id;

        // Validation
        if (!userId || !amount || !category || !date || !currency) {
            return res.status(400).json({ message: "All required fields must be filled." });
        }

        const newExpense = new Expense({
            userId,
            amount,
            category,
            date,
            description,
            currency
        });

        await newExpense.save();
        res.status(201).json({ message: "Expense added successfully", expense: newExpense });

    } catch (error) {
        console.error("Error adding expense:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Controller to get all expense records for a user
export const getExpense = async (req, res) => {
    try {
        const userId = req.user._id;  // Extract user ID from authenticated request
        const expenses = await Expense.find({ userId });

        res.status(200).json(expenses);
    } catch (err) {
        console.error("Error fetching expenses:", err.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
