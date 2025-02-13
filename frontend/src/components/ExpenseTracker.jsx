import React, { useState, useEffect } from "react";
import axios from "axios";
import axiosInstance from "../lib/axios";

const ExpenseTracker = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [formData, setFormData] = useState({
    amount: "",
    currency: "EUR",
    category: "food",
    date: "",
    description: "",
  });

  // Fetch expenses from backend
  useEffect(() => {
    axiosInstance.get("expenseRoute/getExpense")
      .then((response) => setExpenses(response.data))
      .catch((error) => console.error("Error fetching expenses:", error));
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("expenseRoute/addExpense", formData);
      console.log("expense added")
      setExpenses([...expenses, formData]);
      setModalOpen(false);
      setFormData({ amount: "", currency: "EUR", category: "food", date: "", description: "" });
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  const removeExpense = async (id) => {
    try {
      await axiosInstance.delete(`expenseRoute/deleteexpense/${id}`);
      setExpenses(expenses.filter((expense) => expense._id !== id));
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  return (
    <div className="bg-slate-100 w-screen h-screen flex justify-center">
      <div className="max-w-5xl mx-auto my-10 p-6 bg-slate-50 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-blue-800">Expenses</h1>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            + New Expense
          </button>
        </div>
        <table className="w-full border-collapse bg-white rounded-lg shadow-lg">
          <thead>
            <tr className="border-b bg-blue-50 text-blue-800">
              <th className="py-3 px-4 text-left">Amount</th>
              <th className="py-3 px-4 text-left">Category</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">Description</th>
              <th className="py-3 px-4 text-left">Currency</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense._id} className="hover:bg-blue-50 text-black border-b last:border-0">
                <td className="py-3 px-4">{expense.amount}</td>
                <td className="py-3 px-4 capitalize">{expense.category}</td>
                <td className="py-3 px-4">{expense.date}</td>
                <td className="py-3 px-4">{expense.description}</td>
                <td className="py-3 px-4">{expense.currency}</td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => removeExpense(expense._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {modalOpen && (
          <div className="fixed inset-0 bg-slate-100 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl"
              >
                &times;
              </button>
              <h2 className="text-xl font-bold text-blue-800 mb-4">Add New Expense</h2>
              <form onSubmit={handleSubmit} className="space-y-4 text-black">
                <input type="number" id="amount" value={formData.amount} onChange={handleInputChange} required placeholder="Amount" className="w-full p-2 border" />
                <input type="date" id="date" value={formData.date} onChange={handleInputChange} required className="w-full text-white bg-base-100 p-2 border" />
                <select id="currency" value={formData.currency} onChange={handleInputChange} className="w-full p-2 border">
                  {["EUR", "USD", "GBP", "INR"].map((curr) => (
                    <option key={curr} value={curr}>{curr}</option>
                  ))}
                </select>
                <select id="category" value={formData.category} onChange={handleInputChange} className="w-full p-2 border">
                  {["food", "office", "travel", "accommodation", "subscription"].map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <textarea id="description" value={formData.description} onChange={handleInputChange} required rows="3" className="w-full p-2 border" placeholder="Description"></textarea>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-full">Add Expense</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseTracker;
