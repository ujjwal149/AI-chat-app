import "dotenv/config";

import express from "express";
import cors from "cors";

import prisma from "./lib/prisma.ts";

import chatRoutes from "./routes/chatRoutes.ts";
import signupRoutes from "./routes/authRoutes.ts";

const app = express();

// Middleware
app.use(
  cors({
    origin: true,
  })
);

app.use(express.json());

// Routes
app.use("/api/chat", chatRoutes);
app.use("/api/auth",signupRoutes);

app.get("/", (req, res) => {
  res.send("Server is running...");
});

export default app;