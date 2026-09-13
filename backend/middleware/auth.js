import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Please login first",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("isActive");

    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        message: "This account is unavailable",
      });
    }

    req.userId = decoded.id;

    next();
  } catch (error) {

    console.error("Authentication error:", error);


    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};
