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
    <div className="max-w-3xl mx-auto">
      <h1 className="text-xl mb-4">Update Task</h1>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="text"
          name="title"
          value={todoData.title}
          onChange={handleChange}
          placeholder="Enter title"
          className="input input-bordered w-full"
        />
        <textarea
          name="description"
          value={todoData.description}
          onChange={handleChange}
          placeholder="Enter description"
          className="textarea textarea-bordered w-full h-24"
        ></textarea>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="completed"
            checked={todoData.completed}
            onChange={handleChange}
            className="checkbox"
          />
          <span>Completed</span>
        </label>
        <button type="submit" className="btn btn-primary w-full">
          Update Todo
        </button>
      </form>
    </div>
  );
};

export default UpdateTodo;
