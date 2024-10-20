

import React, { useState, useEffect, Fragment } from "react";
import { Task } from "../../types/Task";
import { v4 as uuidv4 } from "uuid";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon, Calendar } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface TaskFormProps {
  onSubmit: (task: Task) => void;
  onCancel: () => void;
  initialTask?: Task | null;
  theme: "light" | "dark";
}

const TaskForm: React.FC<TaskFormProps> = ({
  onSubmit,
  onCancel,
  initialTask,
  theme,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");

  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title);
      setDescription(initialTask.description);
      setDueDate(initialTask.dueDate);
      setPriority(initialTask.priority);
    }
  }, [initialTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dueDate) return; 
    const task: Task = {
      id: initialTask ? initialTask.id : uuidv4(),
      title,
      description,
      dueDate,
      priority,
      status: initialTask ? initialTask.status : "pending",
    };
    onSubmit(task);
  };

  const priorityOptions = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
  ];

  // Custom input component for the DatePicker
  const CustomInput = React.forwardRef(({ value, onClick }: any, ref: any) => (
    <div className="relative">
      <input
        value={value}
        onClick={onClick}
        readOnly
        ref={ref}
        className={`w-full px-3 py-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 ${
          theme === "dark"
            ? "bg-neutral-800 border-none text-white"
            : "bg-white border-gray-300 text-gray-900"
        }`}
        placeholder="Select a date"
      />
      <Calendar
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        size={20}
      />
    </div>
  ));

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div
        className={`p-8 rounded-lg shadow-xl max-w-md w-full ${theme === "dark" ? "bg-black text-white" : "bg-white text-gray-800"}`}
      >
        <h2 className="text-2xl font-bold mb-4">
          {initialTask ? "Edit Task" : "Add New Task"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className={`block text-sm font-medium mb-1 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 ${
                theme === "dark"
                  ? "bg-neutral-800 border-none text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className={`block text-sm font-medium mb-1 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 ${
                theme === "dark"
                  ? "bg-neutral-800 border-none text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
              rows={3}
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              htmlFor="dueDate"
              className={`block text-sm font-medium mb-1 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
            >
              Due Date
            </label>
            <DatePicker
              selected={dueDate}
              onChange={(date: Date | null) => setDueDate(date)}
              minDate={new Date()} // Disable past dates
              customInput={<CustomInput />}
              dateFormat="MMMM d, yyyy"
              className={`w-full ${theme === "dark" ? "react-datepicker-dark" : ""}`}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="priority"
              className={`block text-sm font-medium mb-1 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
            >
              Priority
            </label>
            <Menu as="div" className="relative inline-block text-left w-full">
              <div>
                <Menu.Button
                  className={`inline-flex justify-between w-full px-4 py-2 text-sm font-medium ${
                    theme === "dark"
                      ? "bg-neutral-800 text-white"
                      : "bg-white text-gray-900 border border-gray-300"
                  } rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
                >
                  {priority.charAt(0).toUpperCase() + priority.slice(1)}
                  <ChevronDownIcon
                    className="-mr-1 ml-2 h-5 w-5"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items
                  className={`absolute right-0 w-full mt-2 origin-top-right ${
                    theme === "dark" ? "bg-neutral-800 border-none" : "bg-white"
                  } divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
                >
                  <div className="px-1 py-1">
                    {priorityOptions.map((option) => (
                      <Menu.Item key={option.value}>
                        {({ active }) => (
                          <div
                            className={`${
                              active
                                ? "bg-violet-500 text-white"
                                : theme === "dark"
                                  ? "text-gray-300"
                                  : "text-gray-900"
                            } group flex rounded-md items-center w-full px-2 py-2 text-sm cursor-pointer`}
                            onClick={() =>
                              setPriority(
                                option.value as "low" | "medium" | "high",
                              )
                            }
                          >
                            {option.label}
                          </div>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onCancel}
              className={`px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 ${
                theme === "dark"
                  ? "bg-neutral-800 text-white hover:bg-neutral-900"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                theme === "dark"
                  ? "bg-violet-600 hover:bg-violet-700"
                  : "bg-violet-500 hover:bg-violet-600"
              }`}
            >
              {initialTask ? "Update Task" : "Add Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
