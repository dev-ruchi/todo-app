import Todo from "../models/todo.js";

export function create(data) {
  return Todo.create(data);
}

export function findAll() {
  return Todo.find();
}

export function findById(id) {
  return Todo.findById(id);
}

export function update(id, data) {
  return Todo.findByIdAndUpdate(id, data, { new: true });
}

export function deleteById(id) {
  return Todo.findByIdAndDelete(id);
}
