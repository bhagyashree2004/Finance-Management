import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import axiosInstance from "../lib/axios";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartByCategory = () => {
  const [months, setMonths] = useState([]); // Available months
  const [selectedMonth, setSelectedMonth] = useState("Select Month"); // Selected month
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Fetch available months
    axiosInstance.get("/charRoute/availableMonths")
      .then(response => setMonths(response.data))
      .catch(error => console.error("Error fetching months:", error));
  }, []);

  useEffect(() => {
    if (!selectedMonth) return;

    // Fetch category-wise expenses for the selected month
    axiosInstance.get(`/charRoute/chartByCategory/${selectedMonth}`)
      .then(response => {
        const data = response.data;
        const labels = data.map(item => item.category);
        const expenses = data.map(item => item.total);

        setChartData({
          labels,
          datasets: [
            {
              label: "Category-wise Expenses",
              data: expenses,
              backgroundColor: ["#ff6384", "#36a2eb", "#ffce56", "#4bc0c0", "#9966ff", "#ff9f40"],
              hoverBackgroundColor: ["#ff4d6d", "#2585d9", "#f7b733", "#36cfc9", "#7d5fff", "#ffa600"],
            },
          ],
        });
      })
      .catch(error => console.error("Error fetching category expenses:", error));
  }, [selectedMonth]);

  return (
    <div className="w-full max-w-md text-black mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold text-center mb-4 text-blue-800">Expense Distribution</h2>
      
      {/* Month Selection Dropdown */}
      <select
        className="w-full p-2 text-base-500 border rounded-md mb-4"
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
      >
        <option className="bg-base-500" value="">Select Month</option>
        {months.map((month, index) => (
          <option key={index} value={month}>{month}</option>
        ))}
      </select>

      {/* Pie Chart */}
      {chartData ? <Pie data={chartData} /> : <p className="text-center">Select a month to view the chart</p>}
    </div>
  );
};

export default PieChartByCategory;
