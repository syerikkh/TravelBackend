import express from "express";
import { createTravel, getTravel } from "../controllers/travelController";
import upload from "../middleware/multer.";

export const router = express.Router();

router.post("/createTravel", upload.single("ímage"), createTravel);
router.get("/travels", getTravel);

export { router as travelRoutes };
