import cloudinary from "../config/cloudinary.js";

export const uploadAsset = async (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, message: "Choose a file to upload." });
  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) return res.status(503).json({ success: false, message: "Cloudinary is not configured on the server." });
  try {
    const folder = req.body.folder?.toLowerCase().includes("resource") ? "skillforge/resources" : "skillforge/media";
    const resourceType = req.file.mimetype.startsWith("video/") ? "video" : req.file.mimetype.startsWith("image/") ? "image" : "raw";
    const result = await new Promise((resolve, reject) => { const stream = cloudinary.uploader.upload_stream({ folder, resource_type: resourceType, use_filename: true, unique_filename: true }, (error, output) => error ? reject(error) : resolve(output)); stream.end(req.file.buffer); });
    return res.status(201).json({ success: true, asset: { url: result.secure_url, publicId: result.public_id, resourceType: result.resource_type, format: result.format, bytes: result.bytes } });
  } catch (error) { console.error("Cloudinary upload error:", error); return res.status(500).json({ success: false, message: "Upload failed. Please try again." }); }
};
