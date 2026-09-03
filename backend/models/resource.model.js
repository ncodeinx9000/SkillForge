import mongoose, { mongo } from "mongoose";

const resourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    type: {
      type: String,
      enum: ["Article", "Video", "PDF", "Template", "Website", "Course"],
      required: true,
    },

    url: {
      type: String,
      required: true,
      trim: true,
    },

    thumbnail: {
      type: String,
      default: "",
    },

    estimatedDuration: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      default: "",
      trim: true,
    },

    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },

    tags: [
      {
        type: String,
        trim: true,
      },
    ],

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["draft", "approved", "rejected", "published", "archived"],
      default: "draft",
    },

    // Publish status
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const Resource = mongoose.model("Resource", resourceSchema);
