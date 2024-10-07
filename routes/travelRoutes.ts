import express from "express";
import {
  createTravel,
  getOneTravel,
  getTravel,
  getTravelWithLimit,
} from "../controllers/travelController";
import upload from "../middleware/multer.";

export const router = express.Router();

router.post("/createTravel", upload.single("image"), createTravel);
router.get("/travels", getTravel);
router.get("/getTravelWithLimit", getTravelWithLimit);
router.get("/travel/:id", getOneTravel);

export { router as travelRoutes };
