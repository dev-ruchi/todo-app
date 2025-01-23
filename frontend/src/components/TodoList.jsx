import React from "react";
import backend from "../network/backend.js";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CreateTodo from "./CreateTodo";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEdition from "@mui/icons-material/ModeEdit";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

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

  const deleteTodo = (id) => {
    // Make a DELETE request to the backend to remove the todo item
    backend.delete(`/todos/${id}`).then(() => {
      // Update the local state to remove the deleted todo
      const updatedTodos = todos.filter((todo) => todo._id !== id);
      setTodos(updatedTodos);
    });
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="space-y-4">
        <CreateTodo />
        {todos.map((todo) => (
          <div
            key={todo._id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 border border-gray-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3 flex-1">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleCompletion(todo._id)}
                  className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <h1
                  className={`text-xl font-semibold ${
                    todo.completed
                      ? "text-gray-400 line-through"
                      : "text-gray-800"
                  }`}
                >
                  {todo.title}
                </h1>
              </div>
              <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-800 rounded-md transition-colors duration-200">
                <Link to={`/update/${todo._id}`}>
                  <Tooltip title="Edit">
                    <IconButton>
                      <ModeEdition />
                    </IconButton>
                  </Tooltip>
                </Link>
              </button>
              <button
                onClick={() => deleteTodo(todo._id)}
                className="px-3 py-1 text-sm text-gray-500 hover:text-gray-800 rounded-md transition-colors duration-200"
              >
                <Tooltip title="Delete">
                  <IconButton>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </button>
            </div>
            <p
              className={`text-sm ${
                todo.completed ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {todo.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
