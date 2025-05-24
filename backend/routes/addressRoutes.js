import express from "express";
import {
  getAllAddresses,
  addAddress,
  getAddressById,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} from "../controllers/addressController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getAllAddresses);
router.post("/add", protect, addAddress);
router.get("/:id", protect, getAddressById);
router.put("/:id", protect, updateAddress);
router.delete("/:id", protect, deleteAddress);
router.patch("/:id/default", protect, setDefaultAddress);

export default router;
