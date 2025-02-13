import express from "express";
import Expense from "../models/expense.js";

const router = express.Router();

// ✅ Get Available Months for Selection
router.get("/availableMonths", async (req, res) => {
  try {
    const months = await Expense.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%m-%Y", date: "$date" } }
        }
      },
      { $sort: { "_id": -1 } } // Sort by recent months
    ]);

    const formattedMonths = months.map(m => {
      const [month, year] = m._id.split("-");
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      return `${monthNames[parseInt(month, 10) - 1]} ${year}`;
    });

    res.json(formattedMonths);
  } catch (error) {
    res.status(500).json({ message: "Error fetching months", error });
  }
});

// ✅ Get Category-wise Expenses for Selected Month
router.get("/chartByCategory/:month", async (req, res) => {
  try {
    const selectedMonth = req.params.month;
    
    // Convert "Jan 2024" format to "01-2024"
    const [monthName, year] = selectedMonth.split(" ");
    const monthIndex = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].indexOf(monthName) + 1;
    const formattedMonth = `${monthIndex.toString().padStart(2, "0")}-${year}`;

    const expenses = await Expense.aggregate([
      {
        $match: {
          date: { 
            $gte: new Date(`${year}-${monthIndex}-01`),
            $lt: new Date(`${year}-${monthIndex + 1}-01`)
          }
        }
      },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" }
        }
      },
      { $sort: { total: -1 } } // Highest expenses first
    ]);

    const formattedExpenses = expenses.map(item => ({
      category: item._id,
      total: item.total
    }));

    res.json(formattedExpenses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching category expenses", error });
  }
});

export default router;
