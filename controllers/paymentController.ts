import { AuthenticatedRequest } from "../middleware/authMiddleware";
import { Request, Response } from "express";
import { User } from "../models/userModel";
import { PaymentModel } from "../models/paymentModel";

export const createPayment = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { travelId, paymentType } = req.body;
  try {
    const user = await User.findById(req.user?._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const travel = user.cart.find((id) => id.toString() === travelId);
    if (!travel) {
      return res.status(404).json({ message: "Travel not found in cart" });
    }
    const newPayment = await PaymentModel.create({});
  } catch (error) {}
};
