import { Resource } from "../../models/resource.model.js";
import { User } from "../../models/user.model.js";
import { Notification } from "../../models/notification.model.js";

const parseTags = (tags) => {
  if (Array.isArray(tags)) return tags.filter(Boolean).map((tag) => String(tag).trim());
  if (typeof tags === "string") return tags.split(",").map((tag) => tag.trim()).filter(Boolean);
  return [];
};

const resourceFields = (body) => ({
  title: body.title?.trim(),
  description: body.description?.trim() || "",
  type: body.type,
  url: body.url?.trim(),
  thumbnail: body.thumbnail?.trim() || "",
  estimatedDuration: body.estimatedDuration?.trim() || "",
  category: body.category?.trim() || "",
  level: body.level || "Beginner",
  tags: parseTags(body.tags),
});

export const getMyResources = async (req, res) => {
  try {
    const resources = await Resource.find({ createdBy: req.userId }).sort({ createdAt: -1 });
    return res.json({ success: true, resources });
  } catch (error) {
    console.error("Get mentor resources error:", error);
    return res.status(500).json({ success: false, message: "Failed to load resources" });
  }
};

export const createMentorResource = async (req, res) => {
  try {
    const fields = resourceFields(req.body);
    if (!fields.title || !fields.type || !fields.url) {
      return res.status(400).json({ success: false, message: "Title, type and URL are required" });
    }

    const resource = await Resource.create({ ...fields, createdBy: req.userId, status: "draft", isPublished: false });
    const admins = await User.find({ role: "admin", isActive: true }).select("_id");
    if (admins.length) {
      await Notification.insertMany(admins.map((admin) => ({
        recipient: admin._id,
        type: "resource",
        title: "New Resource Pending Review",
        message: `${resource.title} was submitted for moderation.`,
        relatedId: resource._id,
        relatedModel: "Resource",
      })));
    }
    return res.status(201).json({ success: true, message: "Resource submitted for review", resource });
  } catch (error) {
    console.error("Create mentor resource error:", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const updateMentorResource = async (req, res) => {
  try {
    const resource = await Resource.findOne({ _id: req.params.resourceId, createdBy: req.userId });
    if (!resource) return res.status(404).json({ success: false, message: "Resource not found" });

    Object.assign(resource, resourceFields(req.body));
    resource.status = "draft";
    resource.isPublished = false;
    await resource.save();
    return res.json({ success: true, message: "Resource updated and resubmitted for review", resource });
  } catch (error) {
    console.error("Update mentor resource error:", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteMentorResource = async (req, res) => {
  try {
    const resource = await Resource.findOneAndDelete({ _id: req.params.resourceId, createdBy: req.userId });
    if (!resource) return res.status(404).json({ success: false, message: "Resource not found" });
    return res.json({ success: true, message: "Resource deleted successfully" });
  } catch (error) {
    console.error("Delete mentor resource error:", error);
    return res.status(500).json({ success: false, message: "Failed to delete resource" });
  }
};
