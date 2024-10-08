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
exports.createInvoice = exports.getPayment = exports.createPayment = void 0;
const userModel_1 = require("../models/userModel");
const paymentModel_1 = require("../models/paymentModel");
const axios_1 = __importDefault(require("axios"));
const createPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { travelId, paymentType } = req.body;
    try {
        const user = yield userModel_1.User.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a._id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const travel = user.cart.find((id) => id.toString() === travelId);
        if (!travel) {
            return res.status(404).json({ message: "Travel not found in cart" });
        }
        const newPayment = yield paymentModel_1.PaymentModel.create({
            orderNumber: `ORDER_${Date.now()}`,
            paymentStatus: "not paid",
            paymentType,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        user.payment.push(newPayment._id);
        yield user.save();
        res
            .status(200)
            .json({ message: "Successfully created payment", payment: newPayment });
    }
    catch (error) {
        res.status(400).json({ message: "Failed to create payment", error });
    }
});
exports.createPayment = createPayment;
const getPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const payments = yield paymentModel_1.PaymentModel.find({ userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id }).sort("-createdAt");
        res.status(200).json({ result: payments });
    }
    catch (error) {
        res.status(400).json({ message: "Failed to get payment data", error });
    }
});
exports.getPayment = getPayment;
const createInvoice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const invoiceRes = yield axios_1.default.post("https://merchant.qpay.mn/v2/invoice", {
            invoice_code: "POWER_EXPO_INVOICE",
            sender_invoice_no: "1234567",
            invoice_receiver_code: "terminal",
            invoice_description: "Travel payment",
            amount: req.body.amount,
            callback_url: "https://your-callback-url.com",
        }, { headers: { Cookie: `jwt=${req.body.token}` } });
        return res.status(201).json({ invoiceId: invoiceRes.data });
    }
    catch (error) {
        res.status(400).json({ message: "Failed to create invoice", error });
    }
});
exports.createInvoice = createInvoice;
