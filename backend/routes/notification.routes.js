import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import { getLearnerNotifications, getUnreadLearnerNotifications, markAllNotificationAsRead, markNotificationAsRead } from "../controllers/notification.controller.js";


const notificationRouter = express.Router();

notificationRouter.get("/", isAuthenticated, getLearnerNotifications);

notificationRouter.get("/unread", isAuthenticated, getUnreadLearnerNotifications);

notificationRouter.patch("/:notificationId/read", isAuthenticated, markNotificationAsRead);

notificationRouter.patch("/read-all", isAuthenticated, markAllNotificationAsRead);

export default notificationRouter;