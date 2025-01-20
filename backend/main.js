import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import mongoose from "mongoose";

import todosRouter from "./routes/todos.js";

//import { create, findAll, findById, update, deleteById } from "./store/todo.store.js";

const port = process.env.PORT;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.error("Failed to connect to DB:", err));

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/todos", todosRouter);
// list all end points for todo resource as per RESTful API



app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
