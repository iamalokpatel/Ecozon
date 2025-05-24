import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  placeOrder,
  placeCartOrder,
  getUserOrders,
  OrderSummary,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/", protect, placeOrder);
router.post("/cart", protect, placeCartOrder);
router.get("/", protect, getUserOrders);
router.get("/summary", protect, OrderSummary);

export default router;
