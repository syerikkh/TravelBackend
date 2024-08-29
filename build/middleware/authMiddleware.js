"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(401).json({ message: "Authentication required" });
    }
    jsonwebtoken_1.default.verify(token, "tokensecret", (err, decodedToken) => {
        if (err) {
            return res.status(401).json({ error: "Invalid token" });
        }
        console.log("token", decodedToken);
        next();
    });
};
exports.requireAuth = requireAuth;
