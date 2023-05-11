import express from "express";
import User from "../models/userModel.js";
import { isAdmin, isAuth } from "../utils.js";
import {  addProduct, deleteOrder, deleteProduct, deleteUser, getAllUsers, getOrders, getProducts, getUser, setUserAdmin, summaryOrders, updateProduct } from "../controllers/adminController.js";

const router = express.Router()

// get orders
router.get("/orders", isAuth, isAdmin, getOrders);

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
router.put("/updateProduct", isAuth, isAdmin, updateProduct)

// set user to admin
router.put("/setUser/:id", isAuth, isAdmin, setUserAdmin)

// delete order
router.delete("/orders/:id", isAuth, isAdmin, deleteOrder);




const adminRoute = router
export default adminRoute