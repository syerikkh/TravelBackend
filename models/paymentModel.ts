// import { Schema, model } from "mongoose";

// const paymentSchema = new Schema({
//   orderNumber: {
//     type: String,
//     required: [true, "Please insert input"],
//   },
//   paymentStatus: {
//     type: String,
//     enum: ["paid", "not paid"],
//     required: [true, "Please insert input"],
//     default: "not paid",
//   },
//   paymentType: {
//     type: String,
//     enum: ["QPay", "bank account"],
//     required: [true, "Please insert input"],
//   },
//   userId: {
//     type: Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
//   createdAt: {
//     type: Date,
//     required: [true, "Please insert input"],
//   },
//   updatedAt: {
//     type: Date,
//     required: [true, "Please insert input"],
//   },
// });

// export const PaymentModel = model("payments", paymentSchema);
