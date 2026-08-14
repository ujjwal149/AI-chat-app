import {Router} from "express";
import { 
  signup,
  signin, 
  logout,
  currentUser,
  verifyEmail, 
  resendVerificationEmail,
  forgotPassword,
  verifyResetOtp,
  resetPassword,
  } from "../controllers/authController.ts";

import { authMiddleware } from "../middlewares/authMiddleware.ts";

const router = Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/logout", logout);
router.get("/me", authMiddleware, currentUser);

router.post("/verify-email", verifyEmail);
router.post(
  "/resend-email-verification",
  resendVerificationEmail
);

router.post("/forgot-password", forgotPassword);
router.post("/verify-reset-otp", verifyResetOtp);
router.post("/reset-password", resetPassword);

export default router;