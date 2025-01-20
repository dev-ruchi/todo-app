import "dotenv/config";
import express from "express";

import mongoose from "mongoose";

const port = process.env.PORT;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.error("Failed to connect to DB:", err));

const app = express();

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
