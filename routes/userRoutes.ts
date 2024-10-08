import express from "express";
import {
  signup,
  login,
  getUsers,
  getUser,
  signout,
  addTravelRouteToCart,
  getCart,
  deleteTravelFromCart,
} from "../controllers/userController";
import { requireAdmin, requireAuth } from "../middleware/authMiddleware";

export const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/signout", signout);

router.get("/users", getUsers);
router.get("/adminDashboard", requireAuth, requireAdmin, getUsers);
router.get("/user", requireAuth, getUser);
router.post("/user/addTravelRoute", requireAuth, addTravelRouteToCart);
router.post("/user/deleteTravel", requireAuth, deleteTravelFromCart);
router.get("/user/cart", requireAuth, getCart);

export { router as userRoutes };
