import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protectedRoute = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Không tìm thấy access Token" });
    }

    //xác nhạn token hợp lệ
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      async (err, decodeUser) => {
        if (err) {
          console.error(err);

          return res
            .status(403)
            .json({ message: "Access Token hết hạn hoặc không đúng" });
        }

        //tìm user
        const user = await User.findById(decodeUser.userId).select(
          "-hashedPassword",
        );

        if (!user) {
          return res.status(404).json({ message: "Người dùng không tồn tại" });
        }

        req.user = user;
        next();
      },
    );
  } catch (error) {
    console.error("Lỗi xác minh JWT", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};
