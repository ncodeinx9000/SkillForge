import express from "express";
import { getPublicHomeData } from "../controllers/public.controller.js";

const publicRouter = express.Router();
publicRouter.get("/home", getPublicHomeData);

export default publicRouter;
