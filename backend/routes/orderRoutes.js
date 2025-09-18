import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  createOrderWithPayment, // new endpoint
  getUserOrders,
  OrderSummary,
  getOrderDetails,
} from "../controllers/orderController.js";

const router = express.Router();

// User orders
router.get("/", protect, getUserOrders);
router.get("/summary", protect, OrderSummary);
router.get("/:orderId", protect, getOrderDetails);
router.post("/create", protect, createOrderWithPayment);

export default router;
