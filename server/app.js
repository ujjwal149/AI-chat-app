import "dotenv/config";

import express from "express";
import cors from "cors";
import chatRoutes from "./routes/chatRoutes.js";

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

app.get("/", (req, res) => {
  res.send("Server is running...");
});

export default app;