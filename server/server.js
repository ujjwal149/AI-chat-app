import "dotenv/config"; 

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chatRoutes from "./routes/chatRoutes.js"



const app = express();

const PORT = process.env.PORT || 5000;

//middleware
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://ai-chat-app-two-chi.vercel.app"
  ],
  methods: ["GET", "POST"],
  credentials: true
}));
app.use(express.json());

//Routes
app.use("/api/chat",chatRoutes)

app.get("/",(req,res) => {
    res.send("Server is running...")
})


app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}..`)
})