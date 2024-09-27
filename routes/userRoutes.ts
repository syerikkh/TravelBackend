import express from "express";
import {
  signup,
  login,
  getUsers,
  getUser,
} from "../controllers/userController";
import { requireAdmin, requireAuth } from "../middleware/authMiddleware";

export const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.get("/users", getUsers);
router.get("/adminDashboard", requireAuth, requireAdmin, getUsers);
router.get("/user", requireAuth, getUser);

export { router as userRoutes };
