import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./src/config/db.js";
import { login, signup, logout } from "./src/controllers/auth.controller.js";
import { getProduct } from "./src/controllers/product.contoller.js";
import { protect } from "./middlewares/auth.middleware.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import { deleteUserById, updateUserById, getAllUsers } from "./src/controllers/user.controller.js";

const app = express();

app.use(express.json()); // to-do
app.use(cookieParser()); // cookie-middleware

app.use(cors({
origin: 'http://localhost:5173',
credentials: true,
}
))

app.post("/login", login);
app.post("/signup", signup);
app.get("/products", protect, getProduct);
app.post("/logout", protect, logout);

app.delete("/user/:id", protect, deleteUserById)
app.put("/user/:id", protect, updateUserById)
app.get("/users", getAllUsers);

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
