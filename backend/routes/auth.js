import express from "express";
const router = express.Router();

import { create, findAll } from "../store/user.store.js";

router.post("/signup", (req, res) => {  
  create(req.body)
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json(err));
});


router.get("/", (req, res) => {
  findAll(req.body)
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json(err));
});


export default router; 
