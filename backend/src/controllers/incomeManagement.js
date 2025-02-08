import Income from "../models/income.js";

// Controller to add income
export const addIncome = async (req, res) => {
    try {
        const { source, amount } = req.body;
        const userId = req.user._id;  // Extract user ID from authenticated request

        // Validate input
        if (!source || !amount) {
            return res.status(400).json({ message: "Source and amount are required" });
        }

        // Create new income entry
        const newIncome = new Income({
            userId,
            source,
            amount
        });

        await newIncome.save();
        res.status(201).json({ message: "Income added successfully", income: newIncome });
    } catch (err) {
        console.error("Error adding income:", err.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


// Controller to get all income records for a user
export const getIncome = async (req, res) => {
    try {
        const userId = req.user._id;  // Extract user ID from authenticated request
        const incomes = await Income.find({ userId });

        res.status(200).json(incomes);
    } catch (err) {
        console.error("Error fetching incomes:", err.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
