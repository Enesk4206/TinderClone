import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import cors from "cors";
import bodyParser from "body-parser"

//routes 
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import matchRoutes from "./routes/matchRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";

dotenv.config(); //that line could give us to able process.env.PORT use nontrouble


const app = express();
const port = process.env.PORT ||5000;

app.use(express.json()); // it can useable to req.body like (when user send e request information we can get to that information and process)
app.use(cookieParser());
app.use(cors({
    origin : "http://localhost:5173",
    credentials: true,
}));
app.use(bodyParser.json({limit:'20mb'}))
app.use(bodyParser.urlencoded({limit:'20mb', extended:true}))

app.use("/api/auth", authRoutes);
app.use("/api/users",userRoutes);
app.use("/api/messages",messageRoutes);
app.use("/api/matches", matchRoutes);


app.listen(port, ()=>{
    console.log(`Server starting to the port: http://localhost:${port}`);
    connectDB();
});