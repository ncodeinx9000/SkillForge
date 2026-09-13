import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import upload from "../middleware/upload.js";
import { uploadAsset } from "../controllers/upload.controller.js";

const uploadRouter = express.Router();
uploadRouter.post("/", isAuthenticated, upload.single("file"), uploadAsset);
export default uploadRouter;
