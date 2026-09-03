import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    reporter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    targetUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    targetId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },
    type: {
      type: String,
      enum: [
        "mentor",
        "resource",
        "session",
        "businessIdea",
        "roadmap",
        "other",
      ],
      required: true,
    },

    reason: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    status: {
      type: String,
      enum: ["open", "resolved", "dismissed"],
      default: "open",
    },

    resolvedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

export const Report = mongoose.model("Report", reportSchema);
