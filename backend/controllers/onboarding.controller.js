import { User } from "../models/user.model.js";

export const saveSkill = async (req, res) => {
  try {
    const { skills } = req.body;

    if (!skills || !Array.isArray(skills) || skills.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Skills are required and must be an array",
      });
    }

    const user = await User.findByIdAndUpdate(
      req.userId,
      { skills },
      { new: true },
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({ success: true, message: "Skills saved successfully", user });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const saveInterests = async (req, res) => {
  try {
    const { interests } = req.body;

    if (!interests || Array.isArray(interests) || interests.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Interest are required and must be an array",
      });
    }

    const user = await User.findByIdAndUpdate(
      req.userId,
      { interests },
      { new: true },
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      message: "Interests saved successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const saveBudget = async (req, res) => {
  try {
    const { budget } = req.body;

    if (!budget) {
      return res.json({
        success: false,
        message: "budget are required and must be an array",
      });
    }

    const user = await User.findByIdAndUpdate(
      req.userId,
      { budget },
      { new: true },
    );

    if (!user) {
      res.json({
        success: false,
        user,
      });
    }

    res.json({
      success: true,
      message: "Interests saved successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const saveLocation = async (req, res) => {
  const { location } = req.body;

  if (!location) {
    return res.json({ success: false, message: "location is required" });
  }

  const user = await User.findByIdAndUpdate(
    req.userId,
    {
      location,
      onboardingCompleted: true,
    },
    {
      new: true,
    },
  );

  res.json({
    success: true,
    user,
  });
};
