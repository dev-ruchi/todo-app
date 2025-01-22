import React from "react";
import backend from "../network/backend.js";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateTodo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [todoData, setTodoData] = useState({
    title: "",
    description: "",
    completed: false,
  });

  const fetchTodo = () => {
    backend
      .get(`/todos/${id}`)
      .then((response) => {
        setTodoData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching todo:", error);
        alert("Error fetching todo.");
      });
  };

  useEffect(() => {
    fetchTodo();
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();

    if (!id) {
      alert("Todo ID is required!");
      return;
    }

    const payload = {
      ...todoData,
      updated_at: new Date().toISOString(),
    };

    backend
      .put(`/todos/${todoData._id}`, payload)
      .then((response) => {
        console.log("Todo updated successfully:", response.data);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((error) => {
        console.error("Error updating todo:", error);
        alert("Failed to update todo.");
      });
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setTodoData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 bg-white rounded-lg shadow-sm">
    <h1 className="text-2xl font-semibold text-gray-800 mb-6">Update Task</h1>
    <form onSubmit={handleUpdate} className="space-y-6">
      <div>
        <input
          type="text"
          name="title"
          value={todoData.title}
          onChange={handleChange}
          placeholder="Enter title"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div>
        <textarea
          name="description"
          value={todoData.description}
          onChange={handleChange}
          placeholder="Enter description"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32 resize-none"
        ></textarea>
      </div>
      <label className="flex items-center space-x-3 cursor-pointer">
        <input
          type="checkbox"
          name="completed"
          checked={todoData.completed}
          onChange={handleChange}
          className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <span className="text-gray-700">Completed</span>
      </label>
      <button 
        type="submit" 
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
      >
        Update Todo
      </button>
    </form>
  </div>

  );
};

export default UpdateTodo;
