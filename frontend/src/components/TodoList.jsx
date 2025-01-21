import React from "react";
import backend from "../network/backend.js";
import { useState, useEffect } from "react";

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  function fetchTodos() {
    backend.get("/todos").then((response) => {
      setTodos(response.data);
      console.log(response.data);
    });
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="space-y-4">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 border border-gray-200"
          >
            <input
              type="checkbox"
              className="text-gray-600 text-sm"
              checked={todo.completed}
            />
            <h1 className="text-xl font-bold text-gray-800 mb-2">
              {todo.title}
            </h1>
            <p className="text-gray-600 text-sm">{todo.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
