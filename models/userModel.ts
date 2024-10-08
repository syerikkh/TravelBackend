import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "Travel" }],
  payment: [{ type: mongoose.Types.ObjectId, ref: "Payment" }],
});

export const User = mongoose.model("User", userSchema);
