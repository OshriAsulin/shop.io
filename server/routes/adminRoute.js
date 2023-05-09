import express from "express";
import User from "../models/userModel.js";
import { isAdmin, isAuth } from "../utils.js";
import { deleteUser, getAllUsers } from "../controllers/adminController.js";

const router = express.Router()

router.get('/',isAuth, isAdmin,  getAllUsers);
router.delete('/:id',isAuth, isAdmin,  deleteUser);







const adminRoute = router
export default adminRoute