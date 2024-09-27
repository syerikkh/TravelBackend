"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAdmin = exports.requireAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
        console.log("No token found in cookies");
        return res.status(401).json({ message: "Authentication required" });
    }
    jsonwebtoken_1.default.verify(token, "tokensecret", (err, decodedToken) => {
        if (err) {
            console.log("Token verification failed:", err);
            return res.status(401).json({ error: "Invalid token" });
        }
        console.log("decodedToken", decodedToken);
        req.user = decodedToken;
        next();
    });
};
exports.requireAuth = requireAuth;
const requireAdmin = (req, res, next) => {
    const { isAdmin } = req.user || {};
    if (!isAdmin) {
        return res.status(403).json({ message: "Access denied, admin only" });
    }
    console.log("this is admin");
    next();
};
exports.requireAdmin = requireAdmin;
