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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTravel = exports.getTravel = void 0;
const travelModel_1 = require("../models/travelModel");
const getTravel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const routes = yield travelModel_1.TravelRoute.find();
        return res.json(routes);
    }
    catch (error) {
        return res.status(500).json({ message: "Failed to fetch travel routes" });
    }
});
exports.getTravel = getTravel;
// Create a new travel route
const createTravel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { title, description } = req.body;
    const image = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
    try {
        const newRoute = new travelModel_1.TravelRoute({
            title,
            image,
            description,
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
