import express from "express";
import { getMe, login, logout, register } from "../controllers/auth.controller.js";
import { isAuthenticated } from "../middleware/auth.js";

const authRouter = express.Router();

authRouter.post("/register", register);

authRouter.post("/login", login);

authRouter.get("/me", isAuthenticated, getMe);

authRouter.post("/logout", logout);

export default authRouter;
