import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRouter from "./routes/auth.routes.js";
import connectDb from "./config/db.js";
import onBoardRouter from "./routes/onboarding.route.js";

import learnerRouter from "./routes/learner.routes.js";
import businessIdeaRouter from "./routes/businessIdea.routes.js";
import progressRouter from "./routes/myprogress.routes.js";
import mentorRouter from "./routes/mentor.routes.js";
import sessionRouter from "./routes/session.routes.js";
import questionRouter from "./routes/question.routes.js";
import reviewRouter from "./routes/review.routes.js";
import notificationRouter from "./routes/notification.routes.js";

import adminDashboardRouter from "./routes/admin/adminDashboard.routes.js";
import adminMentorRouter from "./routes/admin/adminMentor.routes.js";
import adminBusinessIdeaRouter from "./routes/admin/adminBusinessIdea.routes.js";
import adminRoadmapRouter from "./routes/admin/adminRoadmap.routes.js";
import adminResourceRouter from "./routes/admin/adminResource.routes.js";
import adminUserRouter from "./routes/admin/adminUser.routes.js";
import adminReportRouter from "./routes/admin/adminReport.routes.js";
import adminProfileRouter from "./routes/admin/adminProfile.routes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

// Authentication & onboarding
app.use("/api/auth", authRouter);
app.use("/api/onboarding", onBoardRouter);

// Learner
app.use("/api/learner", learnerRouter);
app.use("/api/businessIdea", businessIdeaRouter);
app.use("/api/progress", progressRouter);

// Mentor
app.use("/api/mentor", mentorRouter);
app.use("/api/session", sessionRouter);
app.use("/api/questions", questionRouter);
app.use("/api/reviews", reviewRouter);

// Notifications
app.use("/api/notifications", notificationRouter);

// Admin
app.use("/api/admin/dashboard", adminDashboardRouter);
app.use("/api/admin/mentors", adminMentorRouter);
app.use("/api/admin/business-ideas", adminBusinessIdeaRouter);
app.use("/api/admin/roadmaps", adminRoadmapRouter);
app.use("/api/admin/resources", adminResourceRouter);
app.use("/api/admin/users", adminUserRouter);
app.use("/api/admin/reports", adminReportRouter);
app.use("/api/admin/profile", adminProfileRouter);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  connectDb();
  console.log(`Example app listening on port ${port}`);
});


app.get("/api/test", (req, res) => {
    res.json({
        success: true,
        message: "Backend is running correctly"
    });
});