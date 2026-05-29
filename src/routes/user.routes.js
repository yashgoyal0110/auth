import express from "express";
import { protect } from "../../middlewares/auth.middleware.js";
import { deleteUserById, updateUserById, getAllUsers } from "../controllers/user.controller.js"

const router = express.Router();

router.delete("/:id", protect, deleteUserById)
router.put("/:id", protect, updateUserById)
router.get("/", getAllUsers)

export default router;


