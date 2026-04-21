import "dotenv/config"; 

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chatRoutes from "./routes/chatRoutes.js"



const app = express();

//middleware
app.use(cors({
    origin: "http://localhost:5173"
}));
app.use(express.json());

//Routes
app.use("/api/chat",chatRoutes)

app.get("/",(req,res) => {
    res.send("Server is running...")
})


app.listen(process.env.PORT,() => {
    console.log(`Server is running on port ${process.env.PORT}..`)
})