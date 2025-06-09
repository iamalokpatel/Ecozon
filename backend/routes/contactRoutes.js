import express from "express";

import { protect } from "../middlewares/authMiddleware.js";
import { emailSender } from "../controllers/contactCotroller.js";

const router = express.Router();

router.post("/contact", protect, emailSender);

export default router;
