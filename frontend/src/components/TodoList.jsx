import React from "react";
import backend from "../network/backend.js";
import { useState, useEffect } from "react";
import CreateTodo from "./CreateTodo";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from '@mui/icons-material/Update';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);

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

  const toggleCompletion = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo._id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const handleUpdateClick = (todo) => {
    setEditingTodo(todo); // Set the selected todo for editing
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    backend.put(`/todos/${editingTodo._id}`, editingTodo).then(() => {
      const updatedTodos = todos.map((todo) =>
        todo._id === editingTodo._id ? editingTodo : todo
      );
      setTodos(updatedTodos);
      setEditingTodo(null); // Close the update form
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
              <button
                onClick={() => handleUpdateClick(todo)}
                className="px-3 py-1 text-sm text-gray-500 hover:text-gray-800 rounded-md transition-colors duration-200"
              >
               < UpdateIcon />
              </button>
              <button
                onClick={() => deleteTodo(todo._id)}
                className="px-3 py-1 text-sm text-gray-500 hover:text-gray-800 rounded-md transition-colors duration-200"
              >
                <DeleteIcon />
              </button>
            </div>
            <p
              className={`text-sm ${
                todo.completed ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {todo.description}
            </p>

            {/* Render Update Form if editing this todo */}
            {editingTodo && editingTodo._id === todo._id && (
              <form onSubmit={handleUpdateSubmit} className="mt-4 space-y-2">
                <input
                  type="text"
                  name="title"
                  value={editingTodo.title}
                  onChange={(e) =>
                    setEditingTodo({ ...editingTodo, title: e.target.value })
                  }
                  placeholder="Update title"
                  className="w-full px-3 py-2 border rounded-md"
                />
                <textarea
                  name="description"
                  value={editingTodo.description}
                  onChange={(e) =>
                    setEditingTodo({
                      ...editingTodo,
                      description: e.target.value,
                    })
                  }
                  placeholder="Update description"
                  className="w-full px-3 py-2 border rounded-md"
                />
                <div className="flex space-x-2">
                  <button
                    type="submit"
                    className="px-3 py-1 bg-blue-500 text-white rounded-md"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingTodo(null)}
                    className="px-3 py-1 text-gray-500 hover:text-gray-800 rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
