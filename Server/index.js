import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import postRoute from "./routes/post.route.js";
import messageRoute from "./routes/message.route.js";

dotenv.config({});
const app=express();

const PORT = process.env.PORT || 3000;

app.get("/",(_,res)=>{
    return res.status(200).json({
        message:"I am coming from backend",
        success:true
    })
})

app.use(express.json());
app.use(cookieParser());    //middleware
app.use(urlencoded({extended:true}));
const corsOptions={
    origin:"http://localhost:5173",
    Credentials:true
}

app.use(cors(corsOptions));

//api
app.use("/api/v1/user",userRoute);
app.use("/api/v1/post",postRoute);
app.use("/api/v1/message",messageRoute);
//"http://localhost:8000/api/v1/user/register"

app.listen(PORT,()=>{
    connectDB();
    console.log(`Server listen at port ${PORT}`);
})