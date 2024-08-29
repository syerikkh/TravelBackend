import express from "express";
import { createTravel, getTravel } from "../controllers/travelController";

export const router = express.Router();

router.post("/createTravel", createTravel);
router.get("/travels", getTravel);

export { router as travelRoutes };
