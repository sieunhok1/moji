import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./libs/db.js";
import authRouter from "./routes/authRoute.js";
import userRouter from "./routes/userRoute.js";
import cookieParser from "cookie-parser";
import { protectedRoute } from "./middlewares/authMiddleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

//middlewares
app.use(express.json());
app.use(cookieParser());

//public router
app.use("/api/auth", authRouter);
//prive router
app.use(protectedRoute);
app.use("/api/users", userRouter);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server bắt đầu trên cổng ${PORT}`);
  });
});
