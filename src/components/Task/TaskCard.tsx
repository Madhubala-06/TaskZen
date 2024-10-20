import React from "react";
import { Task } from "../../types/Task";
import { Pencil, Trash, Check, Clock, Flag } from "lucide-react";

interface TaskCardProps {
  task: Task;
  onToggleStatus: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  theme: "light" | "dark";
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onToggleStatus,
  onEdit,
  onDelete,
  theme,
}) => {
  const priorityColors = {
    low: "bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-200",
    medium:
      "bg-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    high: "bg-red-200 text-red-800 dark:bg-red-900 dark:text-red-200",
  };

  return (
    <div
      className={`rounded-lg shadow-md p-4 transition-all duration-300 ease-in-out
        ${theme === "dark" ? "bg-neutral-800 hover:bg-neutral-700" : "bg-white hover:bg-gray-50"}
        transform hover:-translate-y-1 hover:shadow-lg`}
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3
            className={`text-xl font-semibold  font-montserrat  ${
              theme === "dark" ? "text-white" : "text-violet-700"
            }`}
          >
            {task.title}
          </h3>
          <span
            className={`text-xs w-12 h-5 p-0.5 px-2 rounded-xl ${
              task.status === "completed"
                ? "text-green-500 border border-green-500 bg-green-700/20"
                : "border border-red-500 text-red-500 bg-red-700/20 font-semibold"
            }`}
          >
            {task.status === "completed" ? "DONE" : "TODO"}
          </span>
        </div>

        <p
          className={`text-sm line-clamp-2  font-montserrat ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}
        >
          {task.description}
        </p>

        <div className="flex flex-wrap items-center gap-3 text-sm">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4 text-gray-400" />
            <span
              className={theme === "dark" ? "text-gray-300" : "text-gray-600"}
            >
              {new Date(task.dueDate).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Flag className="w-4 h-4" />
            <span
              className={`px-2 py-1 rounded-full ${
                priorityColors[task.priority as keyof typeof priorityColors]
              }`}
            >
              {task.priority}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap justify-end gap-2 mt-2">
          <button
            onClick={() => onEdit(task.id)}
            className={`flex items-center justify-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200
              ${
                theme === "dark"
                  ? "bg-blue-900 text-blue-200 hover:bg-blue-800"
                  : "bg-blue-100 text-blue-700 hover:bg-blue-200"
              }`}
          >
            <Pencil className="h-4 w-4" />
            <span className="hidden sm:inline">Edit</span>
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className={`flex items-center justify-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200
              ${
                theme === "dark"
                  ? "bg-red-900 text-red-200 hover:bg-red-800"
                  : "bg-red-100 text-red-700 hover:bg-red-200"
              }`}
          >
            <Trash className="h-4 w-4" />
            <span className="hidden sm:inline">Delete</span>
          </button>
          <button
            onClick={() => onToggleStatus(task.id)}
            className={`flex items-center justify-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200
              ${
                theme === "dark"
                  ? "bg-green-900 text-green-200 hover:bg-green-800"
                  : "bg-green-100 text-green-700 hover:bg-green-200"
              }`}
          >
            <Check className="h-4 w-4" />
            <span className="hidden sm:inline">
              {task.status === "completed"
                ? "Mark Incomplete"
                : "Mark Complete"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
