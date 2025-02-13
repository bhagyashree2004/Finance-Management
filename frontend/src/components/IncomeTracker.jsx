import React, { useState, useEffect } from "react";
import axiosInstance from "../lib/axios";

const IncomeTracker = () => {
  const [incomes, setIncomes] = useState([]);
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchIncomes();
  }, []);

  // Fetch incomes from backend
  const fetchIncomes = async () => {
    try {
      const response = await axiosInstance.get("expenseRoute/getIncome");
      console.log("Fetched incomes:", response.data); // Debugging
      setIncomes(response.data);
    } catch (error) {
      console.error("Error fetching incomes:", error);
    }
  };

  // Add new income
  const addNewIncome = async () => {
    if (!category || !amount) {
      alert("Please fill in all fields!");
      return;
    }

    try {
      console.log("Adding income...");
      const response = await axiosInstance.post("expenseRoute/addIncome", {
        source: category,
        amount: parseFloat(amount),
      });

      console.log("Response:", response.data); // Debugging
      setIncomes([...incomes, response.data.income]);
      setCategory("");
      setAmount("");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding income:", error);
    }
  };

  // Remove income
  const removeIncome = async (id) => {
    try {
      await axiosInstance.delete(`expenseRoute/deleteIncome/${id}`);
      setIncomes(incomes.filter((income) => income._id !== id));
    } catch (error) {
      console.error("Error deleting income:", error);
    }
  };

  // Calculate total income
  const totalIncome = incomes.reduce((total, income) => total + (income.amount || 0), 0);

  return (
    <div className="flex bg-gray-100 text-black min-h-screen">
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-4 text-primary">My Incomes</h1>

        <div className="bg-white p-4 rounded-lg shadow-md text-center mb-6">
          <h2 className="text-xl font-semibold text-icon">
            Total Income: <span className="text-green-500">${totalIncome.toFixed(2)}</span>
          </h2>
        </div>

        <button
          className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition"
          onClick={() => setIsModalOpen(true)}
        >
          + Add Income
        </button>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {incomes.map((income) => (
            <div
              key={income._id}
              className="bg-white p-6 rounded-lg shadow-lg transform transition hover:scale-105 relative"
            >
              <p className="text-xl font-bold text-black">{income.source || "Unknown"}</p>
              <p className="text-green-500 text-lg font-semibold">
                ${income.amount ? income.amount.toFixed(2) : "0.00"}
              </p>
              <button
                className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm hover:bg-red-600 transition"
                onClick={() => removeIncome(income._id)}
              >
                ✖
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for adding new income */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-2xl font-semibold mb-4 text-black">Add New Income</h2>
            <label className="block mb-2 text-black">Source:</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md mb-4 bg-slate-200"
              placeholder="Salary, Freelancing..."
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <label className="block mb-2 text-black">Amount ($):</label>
            <input
              type="number"
              className="w-full p-2 border rounded-md mb-4 bg-slate-200"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <div className="flex justify-between">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                onClick={addNewIncome}
              >
                Add
              </button>
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IncomeTracker;
