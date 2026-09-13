import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const cookieOptions = {
  httpOnly: true,
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  secure: process.env.NODE_ENV === "production",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name?.trim() || !email?.trim() || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }

    const exist = await User.findOne({ email });

    if (exist) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashPassword,
      // Public registration always creates a learner. Mentor and admin roles
      // must be assigned through a controlled administrative workflow.
      role: "learner",
    });

    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Save Cookie
    res.cookie("token", token, cookieOptions);

    // Remove Password
    const userData = await User.findById(user._id).select("-password");

    res.status(201).json({
      success: true,
      message: "Registered Successfully",
      user: userData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  console.log("Login route hit");
  try {
    const { email, password } = req.body;

    // 1. Get user data from DB
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    // 2. Compare the User data enter from frontend with DB user data
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }

    // 3. Generate JWT token if user credential matches
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // 4. Write the JWT token to the cookies
    res.cookie("token", token, cookieOptions);

    // fetch user without password
    const userData = await User.findById(user._id).select("-password");

    // 5. Return the response
    res.json({
      message: "Login Successful",
      user: userData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, phoneNumber, bio, profilePicture } = req.body;
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    if (!name?.trim()) return res.status(400).json({ success: false, message: "Name is required" });
    user.name = name.trim();
    if (phoneNumber !== undefined) user.phoneNumber = String(phoneNumber).trim();
    if (bio !== undefined) user.bio = String(bio).trim();
    if (profilePicture !== undefined) user.profilePicture = String(profilePicture).trim();
    await user.save();
    const userData = await User.findById(user._id).select("-password");
    return res.json({ success: true, message: "Profile updated successfully", user: userData });
  } catch (error) {
    console.error("Update profile error:", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", cookieOptions);

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
