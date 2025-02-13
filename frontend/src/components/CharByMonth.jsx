import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import axiosInstance from "../lib/axios";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartByMonth = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    axiosInstance.get("/expenseRoute/chartbymonth")
      .then(response => {
        const data = response.data;
        const labels = data.map(item => item.month); // Month names
        const expenses = data.map(item => item.total);

        setChartData({
          labels,
          datasets: [
            {
              label: "Monthly Expenses",
              data: expenses,
              backgroundColor: [
                "#ff6384", "#36a2eb", "#ffce56", "#4bc0c0", "#9966ff", "#ff9f40"
              ],
              hoverBackgroundColor: [
                "#ff4d6d", "#2585d9", "#f7b733", "#36cfc9", "#7d5fff", "#ffa600"
              ],
            },
          ],
        });
      })
      .catch(error => console.error("Error fetching expenses:", error));
  }, []);

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold text-center mb-4 text-blue-800">Expense Distribution</h2>
      {chartData ? <Pie data={chartData} /> : <p className="text-center">Loading...</p>}
    </div>
  );
};

export default PieChartByMonth;
