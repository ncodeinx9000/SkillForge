import { Session } from "../../models/session.model.js";
import { Mentor } from "../../models/mentor.model.js";
import { Notification } from "../../models/notification.model.js";
import { LearnerProgress } from "../../models/learnerProgress.model.js";

// ======================================================
// Learner creates a session request
// ======================================================

export const createSession = async (req, res) => {
  try {
    const learnerId = req.userId;

    const {
      mentorId,
      title,
      description,
      date,
      duration,
    } = req.body;

    if (!mentorId || !title || !date) {
      return res.status(400).json({
        success: false,
        message: "Mentor, title and date are required",
      });
    }

    const mentor = await Mentor.findById(mentorId);

    if (!mentor) {
      return res.status(404).json({
        success: false,
        message: "Mentor not found",
      });
    }

    if (!mentor.availability) {
      return res.status(400).json({
        success: false,
        message: "Mentor is currently unavailable",
      });
    }

    // Create session as PENDING.
    // Mentor must confirm it later.
    const session = await Session.create({
      mentor: mentorId,
      learner: learnerId,
      title,
      description,
      date,
      duration,
      status: "pending",
    });

    // Notify mentor about the new request
    await Notification.create({
      recipient: mentor.user,
      type: "session",
      title: "New Session Request",
      message: "You have received a new mentoring session request.",
      relatedId: session._id,
      relatedModel: "Session",
    });

    return res.status(201).json({
      success: true,
      message: "Session request created successfully",
      session,
    });
  } catch (error) {
    console.error("Create session error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create session",
    });
  }
};


// ======================================================
// Get learner's sessions
// ======================================================

export const getLearnerSessions = async (req, res) => {
  try {
    const learnerId = req.userId;

    const sessions = await Session.find({
      learner: learnerId,
    })
      .populate({
        path: "mentor",
        populate: {
          path: "user",
          select: "name email profileImage",
        },
      })
      .sort({ date: -1 });

    return res.status(200).json({
      success: true,
      sessions,
    });
  } catch (error) {
    console.error("Get learner sessions error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get learner sessions",
    });
  }
};


// ======================================================
// Get mentor's sessions
// ======================================================

export const getMentorSessions = async (req, res) => {
  try {
    const userId = req.userId;

    const { status = "all" } = req.query;

    const mentor = await Mentor.findOne({
      user: userId,
    });

    if (!mentor) {
      return res.status(404).json({
        success: false,
        message: "Mentor profile not found",
      });
    }

    const filter = {
      mentor: mentor._id,
    };

    const now = new Date();

    // Scheduled = confirmed sessions
    if (status === "scheduled") {
      filter.status = "confirmed";
    }

    // Upcoming = confirmed + future date
    else if (status === "upcoming") {
      filter.status = "confirmed";
      filter.date = {
        $gte: now,
      };
    }

    // Completed sessions
    else if (status === "completed") {
      filter.status = "completed";
    }

    // Pending requests
    else if (status === "pending") {
      filter.status = "pending";
    }

    // Rejected sessions
    else if (status === "rejected") {
      filter.status = "rejected";
    }

    // Cancelled sessions
    else if (status === "cancelled") {
      filter.status = "cancelled";
    }

    const sessions = await Session.find(filter)
      .populate("learner", "-password")
      .sort({ date: 1 });

    return res.status(200).json({
      success: true,
      status,
      count: sessions.length,
      sessions,
    });
  } catch (error) {
    console.error("Get mentor sessions error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get mentor sessions",
    });
  }
};


// ======================================================
// Mentor confirms session
// ======================================================

export const confirmSession = async (req, res) => {
  try {
    const userId = req.userId;

    const { sessionId } = req.params;

    const mentor = await Mentor.findOne({
      user: userId,
    });

    if (!mentor) {
      return res.status(404).json({
        success: false,
        message: "Mentor profile not found",
      });
    }

    const session = await Session.findOne({
      _id: sessionId,
      mentor: mentor._id,
    });

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not found",
      });
    }

    // Prevent confirming an already processed session
    if (session.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: `Session is already ${session.status}`,
      });
    }

    // Confirm the session
    session.status = "confirmed";

    await session.save();

    // ==================================================
    // NOW the learner becomes an active mentee
    // ==================================================

    await LearnerProgress.findOneAndUpdate(
      {
        learner: session.learner,
        status: "Active",
      },
      {
        $addToSet: {
          bookedMentor: mentor._id,
        },
      }
    );

    // Update mentor statistics
    await Mentor.findByIdAndUpdate(
      mentor._id,
      {
        $inc: {
          totalSessions: 1,
          totalMentees: 1,
        },
      }
    );

    // Notify learner
    await Notification.create({
      recipient: session.learner,
      type: "session",
      title: "Session Confirmed",
      message: "Your mentoring session has been confirmed.",
      relatedId: session._id,
      relatedModel: "Session",
    });

    return res.status(200).json({
      success: true,
      message: "Session confirmed successfully",
      session,
    });
  } catch (error) {
    console.error("Confirm session error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to confirm session",
    });
  }
};


// ======================================================
// Mentor rejects session
// ======================================================

export const rejectSession = async (req, res) => {
  try {
    const userId = req.userId;

    const { sessionId } = req.params;

    const { cancellationReason } = req.body;

    const mentor = await Mentor.findOne({
      user: userId,
    });

    if (!mentor) {
      return res.status(404).json({
        success: false,
        message: "Mentor profile not found",
      });
    }

    const session = await Session.findOne({
      _id: sessionId,
      mentor: mentor._id,
    });

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not found",
      });
    }

    if (session.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: `Session is already ${session.status}`,
      });
    }

    session.status = "rejected";

    session.cancelledBy = userId;

    session.cancellationReason =
      cancellationReason || "";

    await session.save();

    await Notification.create({
      recipient: session.learner,
      type: "session",
      title: "Session Rejected",
      message: "Your mentoring session request was rejected.",
      relatedId: session._id,
      relatedModel: "Session",
    });

    return res.status(200).json({
      success: true,
      message: "Session rejected successfully",
      session,
    });
  } catch (error) {
    console.error("Reject session error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to reject session",
    });
  }
};


// ======================================================
// Complete session
// ======================================================

export const completeSession = async (req, res) => {
  try {
    const userId = req.userId;

    const { sessionId } = req.params;

    const mentor = await Mentor.findOne({
      user: userId,
    });

    if (!mentor) {
      return res.status(404).json({
        success: false,
        message: "Mentor profile not found",
      });
    }

    const session = await Session.findOne({
      _id: sessionId,
      mentor: mentor._id,
    });

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not found",
      });
    }

    if (session.status !== "confirmed") {
      return res.status(400).json({
        success: false,
        message: `Cannot complete a ${session.status} session`,
      });
    }

    session.status = "completed";

    await session.save();

    return res.status(200).json({
      success: true,
      message: "Session completed successfully",
      session,
    });
  } catch (error) {
    console.error("Complete session error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to complete session",
    });
  }
};