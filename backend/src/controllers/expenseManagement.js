import Expense from "../models/expense.js";
import csvParser from "csv-parser";
import { Readable } from "stream";

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


// ✅ Bulk Upload Expenses from CSV
export const bulkUploadExpenses = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Please upload a CSV file" });
        }

        const userId = req.user._id; // Get logged-in user's ID
        const expenses = [];

        // Convert buffer to stream for CSV parsing
        const stream = Readable.from(req.file.buffer.toString("utf-8"));
        stream
            .pipe(csvParser())
            .on("data", (row) => {
                if (row.category && row.amount && row.date && row.currency) {
                    expenses.push({
                        userId,
                        amount: parseFloat(row.amount),
                        category: row.category.trim(),
                        date: new Date(row.date),  // Convert to Date type
                        description: row.description || "",
                        currency: row.currency || "INR"
                    });
                }
            })
            .on("end", async () => {
                if (expenses.length === 0) {
                    return res.status(400).json({ message: "No valid data found in CSV" });
                }

                // Insert multiple expenses in one go
                await Expense.insertMany(expenses);
                res.status(201).json({ message: "Expenses uploaded successfully", expenses });
            })
            .on("error", (error) => {
                console.error("CSV Parsing Error:", error);
                res.status(500).json({ message: "Error processing CSV file" });
            });
    } catch (err) {
        console.error("Error in bulkUploadExpenses:", err.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
