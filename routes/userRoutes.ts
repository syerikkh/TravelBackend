import express from "express";
import { signup, login, getUsers } from "../controllers/userController";
import { requireAdmin, requireAuth } from "../middleware/authMiddleware";

export const router = express.Router();

router.post("/signup", signup);
router.post("/login", requireAuth, login);

router.get("/users", getUsers);
router.get("/adminDashboard", requireAuth, requireAdmin, getUsers);

export { router as userRoutes };
