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
    <div className="flex flex-col items-center py-8 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Create a New Todo</h1>
      <form
        onSubmit={addTodo}
        className="card shadow-lg bg-base-100 p-8 w-full max-w-md space-y-4"
      >
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
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateTodo;
