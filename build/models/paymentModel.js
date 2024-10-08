"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentModel = void 0;
const mongoose_1 = require("mongoose");
const paymentSchema = new mongoose_1.Schema({
    orderNumber: {
        type: String,
        required: [true, "Please insert input"],
    },
    paymentStatus: {
        type: String,
        enum: ["paid", "not paid"],
        required: [true, "Please insert input"],
        default: "not paid",
    },
    paymentType: {
        type: String,
        enum: ["QPay", "bank account"],
        required: [true, "Please insert input"],
    },
    createdAt: {
        type: Date,
        required: [true, "Please insert input"],
    },
    updatedAt: {
        type: Date,
        required: [true, "Please insert input"],
    },
});
exports.PaymentModel = (0, mongoose_1.model)("payments", paymentSchema);
