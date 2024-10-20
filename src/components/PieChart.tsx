import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { TooltipItem } from "chart.js";

Chart.register(...registerables);

interface PieChartProps {
  completedCount: number;
  totalCount: number;
  theme: "light" | "dark";
}

const PieChart: React.FC<PieChartProps> = ({
  completedCount,
  totalCount,
  theme,
}) => {
  const pendingCount = totalCount - completedCount;
  const data = {
    labels: ["Completed", "Pending"],
    datasets: [
      {
        label: "Tasks",
        data: [completedCount, pendingCount],
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)", // Completed
          "rgba(255, 99, 132, 0.6)", // Pending
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)", // Completed border color
          "rgba(255, 99, 132, 1)", // Pending border color
        ],
        borderWidth: 0.5,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<"pie">) => {
            const count = context.raw as number;
            const percentage = ((count / totalCount) * 100).toFixed(2);
            return `${context.label}:  tasks (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div
      className={`p-4 rounded-md h-full pb-12 shadow-md ${theme === "dark" ? "bg-neutral-900" : "bg-white"}`}
    >
      <h2
        className={`text-lg font-semibold mb-2 font-montserrat ${theme === "dark" ? "text-white" : "bg-gradient-to-r from-violet-800 to-violet-400 bg-clip-text text-transparent"}`}
      >
        Task Completion Rate
      </h2>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
