import express from "express";
import User from "../models/userModel.js";
import bcrypt from 'bcryptjs'
import { generateToken, isAdmin, isAuth, sendEmail } from "../utils.js";
import expressAsyncHandler from "express-async-handler";

import { forgetPassword, resetPassword, signIn, signUp, updateUserDetails } from "../controllers/userController.js";

const router = express.Router()

// add isAdmin validation 
// add all functions of admin 


router.put('/profile', isAuth, expressAsyncHandler(updateUserDetails));

router.post('/forget-password', expressAsyncHandler(forgetPassword));

router.post('/reset-password', expressAsyncHandler(resetPassword));

router.post('/signup', signUp);

router.post('/signin', signIn);



const userRoute = router
export default userRoute