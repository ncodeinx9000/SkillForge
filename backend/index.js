import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth.routes.js";
import connectDb from "./config/db.js";
import onBoardRouter from "./routes/onboarding.route.js";

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

app.use("/api/auth", authRouter);
app.use("/api/onboarding", onBoardRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  connectDb();
  console.log(`Example app listening on port ${port}`);
});
