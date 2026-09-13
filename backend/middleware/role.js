import { User } from "../models/user.model.js";

export const requireRole = (...roles) => async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).select("role isActive");

    if (!user || !user.isActive || !roles.includes(user.role)) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to perform this action",
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};

export const isLearner = requireRole("learner");
export const isMentor = requireRole("mentor");
