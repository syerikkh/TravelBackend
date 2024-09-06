import express from "express";
import { createTravel, getTravel } from "../controllers/travelController";
import upload from "../middleware/multer.";
import cloudinary from "../utils/cloudinary";

export const router = express.Router();

router.post("/createTravel", createTravel);
router.get("/travels", getTravel);

export { router as travelRoutes };
