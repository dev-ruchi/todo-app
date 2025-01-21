import React from 'react'
import backend from '../network/backend.js';
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
    <div>
      
    </div>
  )
}

export default TodoList
