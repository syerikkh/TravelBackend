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
exports.getCart = exports.addTravelRouteToCart = exports.getUser = exports.getUsers = exports.signout = exports.login = exports.signup = void 0;
const userModel_1 = require("../models/userModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const travelModel_1 = require("../models/travelModel");
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, isAdmin } = req.body;
    try {
        const existingUser = yield userModel_1.User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = new userModel_1.User({
            name,
            email,
            password: hashedPassword,
            isAdmin,
        });
        yield newUser.save();
        const token = jsonwebtoken_1.default.sign({ userId: newUser._id, isAdmin: newUser.isAdmin }, "tokensecret", {
            expiresIn: "1h",
        });
        res.cookie("jwt", token, { httpOnly: true, maxAge: 1000 * 60 * 60 });
        return res.status(201).json({ message: "Successfully created a user" });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to create new user" });
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield userModel_1.User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid user" });
        }
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect password" });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id, isAdmin: user.isAdmin }, "tokensecret", {
            expiresIn: "1h",
        });
        res.cookie("jwt", token, { httpOnly: true, maxAge: 1000 * 60 * 60 });
        return res.status(200).json({
            message: `Successfully logged in ${user.name}`,
            token,
            user: {
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
            },
        });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to log in" });
    }
});
exports.login = login;
const signout = (req, res) => {
    res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });
    res.status(200).json({ message: "Signed out successfull" });
};
exports.signout = signout;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userModel_1.User.find();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch users" });
    }
});
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Ensure req.user exists and has an _id
        if (!req.user || !req.user._id) {
            return res.status(400).json({ message: "User not authenticated" });
        }
        // Find the user by their ID
        const user = yield userModel_1.User.findById(req.user._id);
        // If user is null, return error
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Return the found user
        return res.status(200).json({ user });
    }
    catch (error) {
        return res.status(500).json({ message: "Failed to fetch user", error });
    }
});
exports.getUser = getUser;
const addTravelRouteToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { travelRouteId } = req.body;
    try {
        const travelRoute = yield travelModel_1.TravelRoute.findById(travelRouteId);
        if (!travelRoute) {
            return res.status(404).json({ message: "Travel not found" });
        }
        const user = yield userModel_1.User.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a._id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.cart.push(travelRoute._id);
        yield user.save();
        return res.status(200).json({ message: "Travel added to cart", user });
    }
    catch (error) {
        return res.status(500).json({ message: "Failed to add travel", error });
    }
});
exports.addTravelRouteToCart = addTravelRouteToCart;
const getCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user = yield userModel_1.User.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a._id).populate("cart");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ cart: user.cart });
    }
    catch (error) {
        return res.status(500).json({ message: "Failed to fetch cart", error });
    }
});
exports.getCart = getCart;
