import express from "express";
import dotenv from "dotenv";

//routes 
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import matchRoutes from "./routes/matchRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import { connectDB } from "./config/db.js";

dotenv.config(); //that line could give us to able process.env.PORT use nontrouble
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json()) // it can useable to req.body like (when user send e request information we can get to that information and process)

app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);
app.use("/api/messages",messageRoutes);
app.use("/api/matches", matchRoutes);


app.listen(port, ()=>{
    console.log(`Server starting to the port: http://localhost:${port}`);
    connectDB();
});