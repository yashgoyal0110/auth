import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./src/config/db.js";

import { protect } from "./middlewares/auth.middleware.js";
import cookieParser from "cookie-parser";
import cors from "cors"

import authRouter from './src/routes/auth.routes.js'
import userRouter from './src/routes/user.routes.js'
import productRouter from './src/routes/produts.route.js'

const app = express();

app.use(express.json()); // to-do
app.use(cookieParser()); // cookie-middleware


app.use(cors({
origin: 'http://localhost:5173',
credentials: true,
}
))

app.use("/auth", authRouter);
app.use("/user", userRouter)
app.use("/products", productRouter)

app.get("/", (req, res) => {
  console.log("server is runnign");
  return res.status(200).json({
    message: "server runnnig",
  });
});

await connectDB();

app.listen(process.env.PORT, () => {
  console.log("server-started");
});
