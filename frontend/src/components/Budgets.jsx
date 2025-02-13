import React, { useState, useEffect } from "react";
import { useStore } from "../useStore";
import axiosInstance from "../lib/axios";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import toast from "react-hot-toast";

const Budgets = () => {
  const { totalBudget, totalIncome, totalExpense, getMonthly } = useStore();
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [budgets, setBudgets] = useState([]); // Ensure budgets is always an array
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getMonthly(); // Fetch monthly budget overview
    fetchBudgets();
  }, []);

  // Fetch budgets for the current month
  const fetchBudgets = async () => {
    try {
      const response = await axiosInstance.get("/expenseRoute/getBudget");
      if (response.data && Array.isArray(response.data)) {
        setBudgets(response.data); // Ensure we set only valid array data
      } else {
        setBudgets([]); // Fallback in case of unexpected response structure
      }
    } catch (error) {
      console.error("Error fetching budgets:", error);
      toast.error("Failed to load budgets");
      setBudgets([]); // Ensure we don't end up with undefined
    }
  };

  // Handle adding a new budget
  const handleAddBudget = async (e) => {
    e.preventDefault();
    if (!category || !amount) {
      toast.error("Please enter category and amount");
      return;
    }

    setLoading(true);
    try {
      const response = await axiosInstance.post("/expenseRoute/addBudget", {
        category,
        amount: Number(amount),
      });

      toast.success("Budget added successfully");
      setBudgets([...budgets, response.data]); // Append new budget
      setCategory("");
      setAmount("");
      getMonthly(); // Refresh the total budget details
    } catch (error) {
      console.error("Error adding budget:", error);
      toast.error("Failed to add budget");
    } finally {
      setLoading(false);
    }
  };

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

  return (
    <div className="max-w-5xl mx-auto my-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-blue-800 mb-4">Budget Overview</h1>

      {/* Budget Summary */}
      <div className="bg-blue-50 p-4 rounded-lg shadow-md mb-6 flex justify-between">
        <p className="text-lg font-semibold text-blue-800">
          Total Budget: <span className="font-bold">${totalBudget || 0}</span>
        </p>
        <p className="text-lg font-semibold text-green-600">
          Total Income: <span className="font-bold">${totalIncome || 0}</span>
        </p>
        <p className="text-lg font-semibold text-red-600">
          Total Expenses: <span className="font-bold">${totalExpense || 0}</span>
        </p>
      </div>

      {/* Pie Chart for Expense Distribution */}
      <div className="flex justify-center">
        {budgets.length > 0 ? (
          <PieChart width={300} height={300}>
            <Pie
              data={budgets}
              dataKey="amount"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
            >
              {budgets.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        ) : (
          <p className="text-gray-600">No budget data available.</p>
        )}
      </div>

      {/* Add Budget Form */}
      <div className="mt-6">
        <h2 className="text-2xl font-bold text-blue-800 mb-2">Add Budget</h2>
        <form onSubmit={handleAddBudget} className="bg-gray-100 p-4 text-black rounded-lg shadow-md">
          <div className="mb-3">
            <label className="block text-lg font-medium text-gray-700">Category:</label>
            <input
              type="text"
              placeholder="Enter category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>

          <div className="mb-3">
            <label className="block text-lg font-medium text-gray-700">Amount:</label>
            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded-md w-full hover:bg-blue-700"
          >
            {loading ? "Adding..." : "Add Budget"}
          </button>
        </form>
      </div>

      {/* Expense List */}
      <h2 className="text-2xl font-bold text-blue-800 mt-8">Budgets</h2>
      <div className="mt-4">
        {budgets.length > 0 ? (
          <ul className="bg-gray-50 p-4 rounded-lg shadow-md">
            {budgets.map((budget) => (
              <li key={budget._id} className="flex justify-between py-2 border-b last:border-0">
                <span className="text-gray-700">{budget.category}</span>
                <span className="font-bold text-blue-800">${budget.amount}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No budgets recorded yet.</p>
        )}
      </div>
    </div>
  );
};

export default Budgets;
