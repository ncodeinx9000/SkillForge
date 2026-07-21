import mongoose from "mongoose";

const connectDb = async () => {
  console.log(process.env.MONGO_URI);

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("db connected");
  } catch (error) {
    console.error("Database connection failed:", error.message);
  }
};

export default connectDb;
