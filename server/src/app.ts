import "dotenv/config";

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import chatRoutes from "./routes/chatRoutes.ts";
import signupRoutes from "./routes/authRoutes.ts";

import passport from "./config/passport";

const app = express();

app.use(passport.initialize());

//-----Cookie parser middleware---//
app.use(cookieParser());

//--------Middleware---------//

app.use(
  cors({
     origin: process.env.CLIENT_URL,
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