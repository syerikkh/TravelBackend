"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTravel = exports.getOneTravel = exports.getTravelWithLimit = exports.getTravel = void 0;
const travelModel_1 = require("../models/travelModel");
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const getTravel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const routes = yield travelModel_1.Travel.find();
        return res.json(routes);
    }
    catch (error) {
        return res.status(500).json({ message: "Failed to fetch travel routes" });
    }
});
exports.getTravel = getTravel;
const getTravelWithLimit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;
    const skip = (page - 1) * limit;
    try {
        const routes = yield travelModel_1.Travel.find().skip(skip).limit(limit);
        const totalRoutes = yield travelModel_1.Travel.countDocuments();
        return res.json({
            routes,
            totalPages: Math.ceil(totalRoutes / limit),
            currentPage: page,
        });
    }
    catch (error) {
        return res.status(500).json({ message: "Failed to fetch travel routes" });
    }
});
exports.getTravelWithLimit = getTravelWithLimit;
const getOneTravel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const route = yield travelModel_1.Travel.findById(id);
        if (!route) {
            return res.status(404).json({ message: "Travel route not found" });
        }
        return res.json(route);
    }
    catch (error) {
        return res.status(500).json({ message: "Failed to fetch travel route" });
    }
});
exports.getOneTravel = getOneTravel;
const createTravel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, price } = req.body;
    const image = req.file;
    if (!image) {
        return res.status(400).json({ message: "Image is required" });
    }
    try {
        const result = yield cloudinary_1.default.uploader.upload(image.path);
        const newRoute = new travelModel_1.Travel({
            title,
            image: result.secure_url,
            description,
            price,
        });
        yield newRoute.save();
        res.status(201).json(newRoute);
        console.log("Successfully created a travel");
    }
    catch (error) {
        res.status(500).json({ message: "Failed to create travel route" });
    }
});
exports.createTravel = createTravel;
