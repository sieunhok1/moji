import User from "../models/User.js";
import bcrypt from "bcrypt";

export const signUp = async (req, res) => {
  try {
    const { username, password, email, lastName, firstName } = req.body;

    if (!username || !password || !email || !lastName || !firstName) {
      return res.status(400).json({ message: "Thiếu thông tin bắt buộc" });
    }

    //kiểm tra user tồn tại chưa
    const duplicate = await User.findOne({ username });

    if (duplicate) {
      return res.status(409).json({ message: "Username đã tồn tại" });
    }

    //mã hóa password
    const hashedPassword = await bcrypt.hash(password, 10);

    //tạo user mới
    await User.create({
      username,
      email,
      hashedPassword,
      displayName: `${lastName} ${firstName}`,
    });

    //return
    return res.sendStatus(204);
  } catch (error) {
    console.error("Lỗi khi gọi signUp", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};
