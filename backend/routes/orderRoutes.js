import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  createOrderWithPayment,
  verifyPayment,
  getUserOrders,
  OrderSummary,
  getOrderDetails,
} from "../controllers/orderController.js";

const router = express.Router();

router.get("/", protect, getUserOrders);
router.get("/summary", protect, OrderSummary);
router.get("/:orderId", protect, getOrderDetails);
router.post("/create", protect, createOrderWithPayment);
router.post("/verify", protect, verifyPayment);

export default router;
