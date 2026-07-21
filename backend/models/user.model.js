import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["learner", "mentor", "admin"],
      default: "learner",
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    skills: {
      type: [String],
      default: [],
    },

    interests: {
      type: [String],
      default: [],
    },

    budget: {
      type: String,
      default: "",
    },

    location: {
      type: String,
      default: "",
    },

    onboardingCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const User = mongoose.model("User", userSchema);
