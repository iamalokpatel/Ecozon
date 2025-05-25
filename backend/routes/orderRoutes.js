import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  placeBuyOrder,
  getUserOrders,
  OrderSummary,
} from "../controllers/orderController.js";

const router = express.Router();

router.get("/", protect, getUserOrders);
router.post("/buy", protect, placeBuyOrder);
router.get("/summary", protect, OrderSummary);

export default router;
