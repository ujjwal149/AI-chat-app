import {Router} from "express";
import { signup, signin, logout, currentUser, verifyEmail, resendVerificationEmail,} from "../controllers/authController.ts";

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

export default router;