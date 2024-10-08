"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const paymentController_1 = require("../controllers/paymentController");
const router = express_1.default.Router();
exports.paymentRoutes = router;
router.post("/createPayment", authMiddleware_1.requireAuth, paymentController_1.createPayment);
router.get("/getPayment", authMiddleware_1.requireAuth, paymentController_1.getPayment);
router.post("/createInvoice", authMiddleware_1.requireAuth, paymentController_1.createInvoice);
