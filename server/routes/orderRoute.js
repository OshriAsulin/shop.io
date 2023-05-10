import express from 'express'
import Order from '../models/orderModel.js'
import { isAdmin, isAuth } from '../utils.js'
import expressAsyncHandler from 'express-async-handler';
import { getOrderById, getOrderByUser, newOrder, payOrder } from '../controllers/orderController.js';


const router = express.Router()
//  change the name of this function

router.post('/', isAuth, expressAsyncHandler(newOrder));

router.get('/mine', isAuth, expressAsyncHandler(getOrderByUser));

router.get('/:id', isAuth, expressAsyncHandler(getOrderById));


router.put('/:id/pay', isAuth, expressAsyncHandler(payOrder));


const orderRoute = router
export default orderRoute