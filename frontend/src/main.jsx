import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import TodoList from "./components/TodoList.jsx";
import Layout from "./components/Layout.jsx";
import CreateTodo from "./components/CreateTodo.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <TodoList />,
      },
      {
        path: "/create",
        element: <CreateTodo />,
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
