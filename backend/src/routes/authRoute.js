import express from "express";
import { signUp } from "../controllers/authController.js";

const api = express.Router();

api.post("/signup", signUp);

export default api;
