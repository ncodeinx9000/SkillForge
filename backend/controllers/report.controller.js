import { Report } from "../models/report.model.js";
import { User } from "../models/user.model.js";
import { Notification } from "../models/notification.model.js";

export const createReport = async (req, res) => {
  try {
    const { type, reason, description, targetUser, targetId } = req.body;
    if (!type || !reason) return res.status(400).json({ success: false, message: "Report type and reason are required" });
    const report = await Report.create({ reporter: req.userId, type, reason: reason.trim(), description: description?.trim() || "", targetUser: targetUser || null, targetId: targetId || null });
    const admins = await User.find({ role: "admin", isActive: true }).select("_id");
    if (admins.length) await Notification.insertMany(admins.map((admin) => ({ recipient: admin._id, type: "report", title: "New Report Submitted", message: `A new ${type} report needs review.`, relatedId: report._id, relatedModel: "Report" })));
    return res.status(201).json({ success: true, message: "Report submitted", report });
  } catch (error) {
    console.error("Create report error:", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};
