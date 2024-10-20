import React, { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import TaskList from "../components/Task/TaskList";
import BarChart from "../components/chart";
import PieChart from "../components/PieChart";
import { Task } from ".././types/Task";
const LandingPage: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">(
    () => (localStorage.getItem("theme") as "light" | "dark") || "light",
  );

  type Status = "Pending" | "Completed" | "All";
  const [status, setStatus] = useState<Status>("All");
  const [totalCount, setTotalCount] = useState<number>(0);
  const [completedCount, setCompletedCount] = useState<number>(0);
  const [pendingCount, setPendingCount] = useState<number>(0);

  const updateStatus = (newStatus: Status) => {
    setStatus(newStatus);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const updateTaskCounts = (tasks: Task[]) => {
    const completed = tasks.filter(
      (task) => task.status === "completed",
    ).length;
    const pending = tasks.length - completed;
    setCompletedCount(completed);
    setPendingCount(pending);
    setTotalCount(tasks.length);
  };

  return (
    <div
      className={`min-h-screen ${
        theme === "dark" ? "bg-black" : "bg-gray-200"
      } flex flex-col`}
    >
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main className="flex-grow p-4 lg:p-8 pt-20">
        <div
          className={`rounded-md flex border-white w-full h-56 mb-10 ${
            theme === "dark"
              ? "bg-gradient-to-r from-violet-500/20 to-transparent"
              : "bg-gradient-to-r from-violet-500 to-transparent"
          }`}
        >
          <div className="p-5 lg:p-10">
            <h1
              className={`text-base md:text-3xl font-montserrat ${
                theme === "dark" ? "text-violet-500" : "text-white"
              }`}
            >
              HELLO MadhuBala!,
            </h1>
            <p
              className={`text-xs sm:text-sm md:text-lg mt-4 w-4/5 text-white`}
            >
              Welcome back! You're about to take charge of your tasks. Whether
              it's a big project or a small note, every to-do counts. Let's stay
              organized, focused, and productive. Start creating your tasks, and
              make today a productive one!
            </p>
          </div>
          <img
            src="/banner2.png"
            alt="Banner"
            className="h-auto sm:w-56 hidden sm:block"
          />
        </div>

        <div className="flex gap-y-3 flex-col md:flex-row h-auto md:h-56 gap-x-7">
          <div className="w-full sm:w-4/5 md:w-3/4 lg:w-1/4">
            <BarChart
              completedCount={completedCount}
              pendingCount={pendingCount}
              totalCount={totalCount}
              theme={theme}
            />
          </div>
          <div className="w-full sm:w-4/5 md:w-3/4 lg:w-1/4">
            <PieChart
              completedCount={completedCount}
              totalCount={totalCount}
              theme={theme}
            />
          </div>
        </div>

        <div className="w-full md:w-1/2 flex mt-6 gap-x-4 h-auto">
          <button
            className={`button p-3 rounded-md text-xs sm:text-base md:text-xl ${
              theme === "light" ? "text-violet-500" : "text-white"
            } ${status === "All" ? "active" : ""}`}
            onClick={() => updateStatus("All")}
          >
            ALL
          </button>
          <button
            className={`button p-3 rounded-md text-xs sm:text-base md:text-xl ${
              theme === "light" ? "text-violet-500" : "text-white"
            } ${status === "Pending" ? "active" : ""}`}
            onClick={() => updateStatus("Pending")}
          >
            Todo Task
          </button>
          <button
            className={`button p-3 rounded-md text-xs sm:text-base md:text-xl ${
              theme === "light" ? "text-violet-500" : "text-white"
            } ${status === "Completed" ? "active" : ""}`}
            onClick={() => updateStatus("Completed")}
          >
            Completed Task
          </button>
        </div>

        <div className="mt-4">
          <TaskList
            theme={theme}
            status={status}
            updateTaskCounts={updateTaskCounts}
          />
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
