import express from "express";
import { signIn, signUp } from "../controllers/authController.js";

const api = express.Router();

api.post("/signup", signUp);
api.post("/signin", signIn);

export default api;
