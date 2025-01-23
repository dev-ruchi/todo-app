import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import mongoose from "mongoose";

import todosRouter from "./routes/todos.js";
import authRouter from "./routes/auth.js";

const port = process.env.PORT;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.error("Failed to connect to DB:", err));

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/todos", todosRouter);
app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
