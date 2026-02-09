import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Session from "../models/Session.js";
import crypto from "crypto";

const ACCESS_TOKEN_TTL = "10s";
const REFRESH_TOKEN_TTL = 14 * 24 * 60 * 60 * 1000;

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

export const signIn = async (req, res) => {
  try {
    //lấy input
    const { username, password } = req.body;

    //kiểm tra user và password có trống không
    if (!username || !password) {
      return res.status(400).json({ message: "Thiếu username hoặc password" });
    }

    //kiểm tra password có khớp không
    const user = await User.findOne({ username });

    if (!user) {
      return res
        .status(401)
        .json({ message: "username hoặc password không chính xác" });
    }

    const passwordCorrect = await bcrypt.compare(password, user.hashedPassword);

    if (!passwordCorrect) {
      return res
        .status(401)
        .json({ message: "username hoặc password không chính xác" });
    }

    //khớp tạo accessToken
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: ACCESS_TOKEN_TTL },
    );

    //tạo refreshToken
    const refreshToken = crypto.randomBytes(64).toString("hex");

    //tạo session
    await Session.create({
      userId: user._id,
      refreshToken,
      expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL),
    });

    //trả refreshToken về cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: REFRESH_TOKEN_TTL,
    });

    //return
    return res.status(200).json({
      message: `${user.displayName} đã đăng nhập thành công`,
      accessToken,
    });
  } catch (error) {
    console.error("Lỗi khi gọi signIn", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const signOut = async (req, res) => {
  try {
    // lấy refresh token
    const token = req.cookies?.refreshToken;

    //xóa refresh token trong session
    await Session.deleteOne({ refreshToken: token });

    //xóa refresh token trong cookie
    res.clearCookie("refreshToken");

    return res.sendStatus(204);
  } catch (error) {
    console.error("Lỗi khi gọi signOut", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const refreshToken = async (req, res) => {
  try {
    //lấy refresh từ header
    const token = req.cookies?.refreshToken;

    if (!token) {
      return res.status(401).json({ message: "Token không tồn tại" });
    }

    //so sánh refresh với session
    const session = await Session.findOne({ token });

    if (!session) {
      return res
        .status(401)
        .json({ message: "Token không hợp lệ hoặc hết hạn" });
    }

    //kiểm tra hết hạn chưa
    if (Session.expiresAt < new Date()) {
      return res.status(401).json({ message: "Token hết hạn" });
    }

    //tạo access token mới
    const accessToken = jwt.sign(
      { userId: session.userId },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: REFRESH_TOKEN_TTL },
    );

    return res.status(200).json({ accessToken });
  } catch (error) {
    console.error("Lỗi khi gọi refreshToken", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};
