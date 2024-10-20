import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { TooltipItem } from "chart.js";

Chart.register(...registerables);

interface BarChartProps {
  completedCount: number;
  pendingCount: number;
  totalCount: number;
  theme: "light" | "dark"; 
}

const BarChart: React.FC<BarChartProps> = ({
  completedCount,
  pendingCount,
  totalCount,
  theme,
}) => {
  const data = {
    labels: ["Completed", "Pending", "Total"],
    datasets: [
      {
        label: "Tasks",
        data: [completedCount, pendingCount, totalCount],
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<"bar">) => {
            const count = context.raw;
            return `Count: ${count}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: totalCount + 5,
      },
    },
  };

  return (
    <div
      className={`p-4 rounded-md h-full pb-12 shadow-md ${theme === "dark" ? "bg-neutral-900" : "bg-white"}`}
    >
      <h2
        className={`text-lg font-semibold mb-2 font-montserrat ${
          theme === "dark"
            ? "text-white "
            : "bg-gradient-to-r from-violet-800 to-violet-100 bg-clip-text text-transparent"
        }`}
      >
        Task Overview
      </h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
