"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = exports.router = void 0;
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const authMiddleware_1 = require("../middleware/authMiddleware");
exports.router = express_1.default.Router();
exports.userRoutes = exports.router;
exports.router.post("/signup", userController_1.signup);
exports.router.post("/login", userController_1.login);
exports.router.get("/users", userController_1.getUsers);
exports.router.get("/adminDashboard", authMiddleware_1.requireAuth, authMiddleware_1.requireAdmin, userController_1.getUsers);
