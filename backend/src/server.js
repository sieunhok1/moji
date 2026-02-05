import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./libs/db.js";
import api from "./routes/authRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

//middlewares
app.use(express.json());

//public router
app.use("/api/auth", api);
//prive router

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server bắt đầu trên cổng ${PORT}`);
  });
});
