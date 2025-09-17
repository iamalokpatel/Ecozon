import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  placeBuyOrder,
  getUserOrders,
  OrderSummary,
  getOrderDetails,
  updatePaymentMethod,
} from "../controllers/orderController.js";

const router = express.Router();

router.get("/", protect, getUserOrders);
router.post("/buy", protect, placeBuyOrder);
router.get("/summary", protect, OrderSummary);
router.get("/:orderId", protect, getOrderDetails);
router.post("/:orderId/pay", protect, updatePaymentMethod);

export default router;
