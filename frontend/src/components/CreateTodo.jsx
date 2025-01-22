import React from "react";
import backend from "../network/backend.js";
import { useState } from "react";

const CreateTodo = () => {
  const [todoData, setTodoData] = useState({
    title: "",
    description: "",
    completed: false,
  });

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setTodoData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  const addTodo = (e) => {
    e.preventDefault();

    const payload = {
      ...todoData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    backend
      .post("/todos", payload)
      .then((response) => {
        console.log("Todo created successfully:", response.data);
        setTodoData({
          title: "",
          description: "",
          completed: false,
        });
      })
      .catch((error) => {
        console.error("Error creating post:", error);
        alert("Error creating post.");
      });
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-md mx-auto p-6  rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Create a New Todo
        </h1>
        <form onSubmit={addTodo} className="space-y-4">
          <input
            type="text"
            name="title"
            value={todoData.title}
            onChange={handleChange}
            placeholder="Enter title"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <textarea
            name="description"
            value={todoData.description}
            onChange={handleChange}
            placeholder="Enter description"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32 resize-none"
          ></textarea>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              name="completed"
              checked={todoData.completed}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-gray-700">Completed</span>
          </label>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTodo;
