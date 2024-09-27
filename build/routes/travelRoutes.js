"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.travelRoutes = exports.router = void 0;
const express_1 = __importDefault(require("express"));
const travelController_1 = require("../controllers/travelController");
const multer_1 = __importDefault(require("../middleware/multer."));
exports.router = express_1.default.Router();
exports.travelRoutes = exports.router;
exports.router.post("/createTravel", multer_1.default.single("image"), travelController_1.createTravel);
exports.router.get("/travels", travelController_1.getTravel);
