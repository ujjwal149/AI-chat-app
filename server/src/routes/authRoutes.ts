import {Router} from "express";
import { signup, signin, logout, currentUser} from "../controllers/authController.ts";

import { authMiddleware } from "../middlewares/authMiddleware.ts";

const router = Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/logout", logout);
router.get("/me", authMiddleware, currentUser);

export default router;