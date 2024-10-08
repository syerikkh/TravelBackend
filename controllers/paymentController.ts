// import { AuthenticatedRequest } from "../middleware/authMiddleware";
// import { Response } from "express";
// import { User } from "../models/userModel";
// import { PaymentModel } from "../models/paymentModel";
// import axios from "axios";

// export const createPayment = async (
//   req: AuthenticatedRequest,
//   res: Response
// ) => {
//   const { travelId, paymentType, token } = req.body;
//   console.log("Received createPayment request", {
//     travelId,
//     paymentType,
//     token,
//   });

//   if (!token) {
//     return res.status(400).json({ message: "Token is required" });
//   }

//   try {
//     const user = await User.findById(req.user?._id);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     const travel = user.cart.find((id) => id.toString() === travelId);
//     if (!travel) {
//       return res.status(404).json({ message: "Travel not found in cart" });
//     }
//     const newPayment = await PaymentModel.create({
//       orderNumber: `ORDER_${Date.now()}`,
//       paymentStatus: "not paid",
//       userId: user._id,
//       paymentType,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     });

//     user.payment.push(newPayment._id);
//     await user.save();

//     console.log("Sending request to QPay API with token:", token);

//     const invoiceRes = await axios.post(
//       "https://merchant.qpay.mn/v2/invoice",
//       {
//         invoice_code: "POWER_EXPO_INVOICE",
//         sender_invoice_no: newPayment.orderNumber,
//         invoice_receiver_code: "terminal",
//         invoice_description: "test",
//         amount: 10,
//         callback_url: "https://localhost:3000",
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     const qrCodeUrl = invoiceRes.data.qr_code_url;

//     res.status(200).json({
//       message: "Successfully created payment",
//       payment: newPayment,
//       qrCodeUrl,
//     });
//   } catch (error: any) {
//     console.error(
//       "Error in createPayment:",
//       error.response ? error.response.data : error.message
//     );
//     res
//       .status(400)
//       .json({ message: "Failed to create payment", error: error.message });
//   }
// };

// export const getPayment = async (req: AuthenticatedRequest, res: Response) => {
//   try {
//     const payments = await PaymentModel.find({ userId: req.user?._id }).sort(
//       "-createdAt"
//     );
//     res.status(200).json({ result: payments });
//   } catch (error) {
//     res.status(400).json({ message: "Failed to get payment data", error });
//   }
// };

// export const getPaymentStatus = async (
//   req: AuthenticatedRequest,
//   res: Response
// ) => {
//   const { paymentId } = req.params;
//   try {
//     const payment = await PaymentModel.findById(paymentId);
//     if (!payment) {
//       return res.status(404).json({ message: "Payment not found" });
//     }
//     res.status(200).json({ paymentStatus: payment.paymentStatus });
//   } catch (error) {
//     res.status(400).json({ message: "Failed to get payment status", error });
//   }
// };
