import mongoose from "mongoose";

const mentorSchema = new mongoose.Schema(
  {
    
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    experience: {
      type: String,
      default: "",
      trim: true,
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    languages: [
      {
        type: String,
        trim: true,
      },
    ],

    expertise: [
      {
        type: String,
        trim: true,
      },
    ],

    bio: {
      type: String,
      default: "",
      trim: true,
    },

    availability: {
      type: Boolean,
      default: true,
    },

    yearsOfExperience: {
      type: Number,
      default: 0,
      min: 0,
    },

    location: {
      type: String,
      default: "",
      trim: true,
    },

    totalMentees: {
      type: Number,
      default: 0,
    },

    totalSessions: {
      type: Number,
      default: 0,
    },

    totalReviews: {
        type: Number,
        default: 0,
    },

    verificationStatus: {
      type: String,
      enum: ["pending", "verified", "rejected"],
      default: "unverified",
    },

  socialLinks: {
      linkedin: {
        type: String,
        default: "",
      },
      twitter: {
        type: String,
        default: "",
      },
      website: {
        type: String,
        default: "",
      },
      youtube: {
        type: String,
        default: "",
      },
    },
  },
  {
    timestamps: true,
  },
);

export const Mentor = mongoose.model("Mentor", mentorSchema);
