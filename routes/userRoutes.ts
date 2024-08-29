import express from "express";
import { signup, login } from "../controllers/userController";

export const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

export { router as userRoutes };
