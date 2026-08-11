import "dotenv/config";

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import chatRoutes from "./routes/chatRoutes.ts";
import signupRoutes from "./routes/authRoutes.ts";

const app = express();

//-----Cookie parser middleware---//
app.use(cookieParser());

//--------Middleware---------//
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

//--------Routes--------//
app.use("/api/chat", chatRoutes);
app.use("/api/auth",signupRoutes);

app.get("/", (req, res) => {
  res.send("Server is running...");
});

export default app;