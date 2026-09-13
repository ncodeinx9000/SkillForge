import multer from "multer";

const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp", "image/gif", "application/pdf", "video/mp4", "video/webm", "video/quicktime", "text/plain", "text/markdown"];
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 50 * 1024 * 1024 }, fileFilter: (req, file, callback) => allowedMimeTypes.includes(file.mimetype) ? callback(null, true) : callback(new Error("Unsupported file type. Upload an image, PDF, video, or text article.")) });
export default upload;
