import React, { useState, useEffect } from "react";
import TaskCard from "./TaskCard";
import TaskForm from "./TaskForm";
import { Task } from "../../types/Task";
import useLocalStorage from "../../hooks/useLocalStorage";

interface TaskListProps {
  theme: "light" | "dark";
  status: "Pending" | "Completed" | "All";
  updateTaskCounts: (tasks: Task[]) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  theme,
  status,
  updateTaskCounts,
}) => {
  const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", []);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    updateTaskCounts(tasks);
  }, [tasks, updateTaskCounts]);

  const tasksWithDate = tasks.map((task) => ({
    ...task,
    dueDate: new Date(task.dueDate),
    status:
      task.status === "completed" || task.status === "pending"
        ? task.status
        : "pending", // Fallback to a valid status
  }));

  const filteredTasks = tasksWithDate.filter((task) => {
    if (status === "All") return true;
    if (status === "Pending") return task.status === "pending";
    if (status === "Completed") return task.status === "completed";
  });

  const handleAddTask = (task: Task) => {
    const newTask: Task = {
      ...task,
      status: task.status as "completed" | "pending", // Ensure the status is typed correctly
    };
    const newTasks = [...tasks, newTask];
    setTasks(newTasks);
  };

  const handleEditTask = (updatedTask: Task) => {
    const newTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task,
    );
    setTasks(newTasks);
    setEditingTask(null);
    updateTaskCounts(newTasks);
  };

  const handleDeleteTask = (id: string) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
    updateTaskCounts(newTasks);
  };

  const handleToggleStatus = (id: string) => {
    const newTasks = tasks.map((task) =>
      task.id === id
        ? ({
            ...task,
            status: task.status === "completed" ? "pending" : "completed",
          } as Task)
        : task,
    );
    setTasks(newTasks);
    updateTaskCounts(newTasks);
  };
  return (
    <div className="lg:mx-5">
      <div className="flex justify-between mb-3 mt-6">
        <h2
          className={`text-xl font-semibold text-sm sm:text-base md:text-xl self-center ${
            theme === "dark" ? "text-white" : "text-violet-700"
          }`}
        >
          Task List
        </h2>
        <button
          className="bg-violet-600 text-white px-4 py-2 text-xs sm:text-base rounded-lg w-28 lg:w-40 hover:bg-violet-700 transition duration-300"
          onClick={() => setIsFormOpen(true)}
        >
          + Add task
        </button>
      </div>
      <div className="grid gap-4">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggleStatus={handleToggleStatus}
              onEdit={() => setEditingTask(task)}
              onDelete={handleDeleteTask}
              theme={theme}
            />
          ))
        ) : (
          <div className="w-1/4 mx-auto">
            <img src="/NoTASK.png" className="mx-auto" alt="No tasks" />
            <p
              className={`bg-gradient-to-r from-violet-800 to-violet-100 bg-clip-text text-transparent text-center`}
            >
              No Task! Add task.
            </p>
          </div>
        )}
      </div>
      {(isFormOpen || editingTask) && (
        <TaskForm
          onSubmit={editingTask ? handleEditTask : handleAddTask}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingTask(null);
          }}
          initialTask={editingTask}
          theme={theme}
        />
      )}
    </div>
  );
};

export default TaskList;
