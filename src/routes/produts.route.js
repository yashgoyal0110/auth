
import express from "express";
import { protect } from "../../middlewares/auth.middleware.js";
import {getProduct} from "../controllers/product.contoller.js"


const router = express.Router();


router.get("/products", protect, getProduct);

export default router;





