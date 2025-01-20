import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import mongoose from "mongoose";

import { create, findAll, findById, update } from "./store/todo.store.js";

const port = process.env.PORT;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.error("Failed to connect to DB:", err));

const app = express();
app.use(cors());
app.use(bodyParser.json());

// list all end points for todo resource as per RESTful API

// GET /todos -> list all todos
app.get("/todos", (req, res) => {
  findAll(req.body).then((data) =>
    res.json(data).catch((err) => res.status(400).json(err))
  );
});

// POST /todos -> create a new todo
app.post("/todos", (req, res) => {
  create(req.body)
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json(err));
});

// GET /todos/:id -> get a todo by id
app.get("/todos/:id", (req, res) => {
  findById(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json(err));
});

// PUT /todos/:id -> update a todo by id
app.put("/todos/:id", (req, res) => {
  update(req.params.id, req.body)
  .then((data) => res.json(data))
  .catch((err) => res.status(400).json(err));
})

// DELETE /todos/:id -> delete a todo by id

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
