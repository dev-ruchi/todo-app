import express from "express";
const router = express.Router();

import {
  create,
  findAll,
  findById,
  update,
  deleteById,
} from "../store/todo.store.js";

// GET /todos -> list all todos
router.get("/", (req, res) => {
  findAll(req.body).then((data) =>
    res.json(data).catch((err) => res.status(400).json(err))
  );
});

// POST /todos -> create a new todo
router.post("/", (req, res) => {
  create(req.body)
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json(err));
});

// // GET /todos/:id -> get a todo by id
router.get("/:id", (req, res) => {
  findById(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json(err));
});

// // PUT /todos/:id -> update a todo by id
router.put("/:id", (req, res) => {
  update(req.params.id, req.body)
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json(err));
});

// // DELETE /todos/:id -> delete a todo by id
router.delete("/:id", (req, res) => {
  deleteById(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json(err));
});

export default router;
