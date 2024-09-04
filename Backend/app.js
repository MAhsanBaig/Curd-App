import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import mongoose from "mongoose";

import authRouter from "./router/authRouter.js";
import curdRouter from "./router/curdRouter.js";



const app = express();
const PORT = process.env.PORT || 2000;
app.use(cors())
 
dotenv.config()

app.use(express.json());


const connectToMongodb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI,);
    console.log("Connected to mongodb");
  } catch (error) {
    console.log("Error connecting to MongoDB", error.message);
  }
};

app.use("/api/auth", authRouter);
app.use("/home", curdRouter);

app.listen(PORT, () => {
  connectToMongodb();
  console.log(`server running on  port ${PORT}`);
});
