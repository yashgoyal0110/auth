import express from "express"
import dotenv from "dotenv"
dotenv.config()
import connectDB from "./src/config/db.js"
import { login, signup } from "./src/controllers/auth.controller.js"

const app = express()

app.use(express.json()) // to-do

app.post("/login", login)
app.post("/signup", signup)

app.get("/", (req, res)=>{
    console.log("server is runnign")
    return res.status(200).json({
        message: "server runnnig"
    })
})

await connectDB();

app.listen(process.env.PORT, ()=>{
    console.log("server-started")
})
