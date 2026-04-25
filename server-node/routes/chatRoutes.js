import express from "express";
import {handleChat} from "../controllers/chatControllers.js";
import { clearMemory } from "../services/memoryStore.js";

const router = express.Router();


router.post("/",handleChat);

router.post("/clear", (req, res) => {
  clearMemory();
  res.json({ message: "Memory cleared" });
});

export default router;