import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGOOSE_CONNECTIONSRING);
    console.log("Liên kết CSDL thành công");
  } catch (error) {
    console.error("Liên kết CSDL thất bại", error);
    process.exit(1);
  }
};
