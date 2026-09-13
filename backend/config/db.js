import mongoose from "mongoose";
import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const connectDb = async () => {
  const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error("MongoDB connection string is missing. Set MONGO_URI or MONGODB_URI in backend/.env.");
  }

  try {
    await mongoose.connect(mongoUri);
    console.log("MongoDB connected");
    return mongoose.connection;
  } catch (error) {
    const details = [
      `message=${error.message}`,
      error.code ? `code=${error.code}` : "",
      error.syscall ? `syscall=${error.syscall}` : "",
      error.hostname ? `hostname=${error.hostname}` : "",
    ].filter(Boolean).join(" ");
    console.error(`MongoDB connection failed: ${details}`);
    throw error;
  }
};

export default connectDb;
