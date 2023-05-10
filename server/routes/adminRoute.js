import express from "express";
import User from "../models/userModel.js";
import { isAdmin, isAuth } from "../utils.js";
import {  addProduct, deleteProduct, deleteUser, getAllUsers, getProducts, getUser, summaryOrders, updateProduct } from "../controllers/adminController.js";

const router = express.Router()

// summary activity 
router.get("/summary", isAuth, isAdmin, summaryOrders);

// send all users to admin panel 
router.get('/',isAuth, isAdmin,  getAllUsers);

// delete user by admin
router.delete('/:id',isAuth, isAdmin,  deleteUser);

// get all products to admin panel
router.get("/admin", isAuth, isAdmin, getProducts);

// delete product by admin 
router.delete('/deleteProduct/:id',isAuth, isAdmin,  deleteProduct);

router.get("/:id", isAuth, isAdmin, getUser);

router.post("/addProduct", isAuth, isAdmin, addProduct)

// implement this in frontend 
router.put("/addProduct", isAuth, isAdmin, updateProduct)





const adminRoute = router
export default adminRoute