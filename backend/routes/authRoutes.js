import express from "express";
import register from "../controllers/auth/register.js";
import login from "../controllers/auth/login.js";
import me from "../controllers/auth/me.js";
import forgotPassword from "../controllers/auth/forgotPassword.js";
import resetPassword from "../controllers/auth/resetPassword.js";
import { protect } from "../middlewares/authMiddleware.js";
import { sendOtp, verifyOtp } from "../controllers/auth/phoneAuth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, me);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:token", resetPassword);

// Phone-first OTP auth
router.post('/phone/send-otp', sendOtp);
router.post('/phone/verify-otp', verifyOtp);

export default router;
