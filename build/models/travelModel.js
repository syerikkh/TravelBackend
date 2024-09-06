"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TravelRoute = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const travelRouteSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
});
exports.TravelRoute = mongoose_1.default.model("TravelRoute", travelRouteSchema);
