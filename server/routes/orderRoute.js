import express from 'express'
import Order from '../models/orderModel.js'
import { isAuth } from '../utils.js'
import expressAsyncHandler from 'express-async-handler';
import { getOrderById, getOrderByUser, newOrder, payOrder } from '../controllers/orderController.js';


const router = express.Router()

router.get('/mine', isAuth, expressAsyncHandler(getOrderByUser));

router.get('/:id', isAuth, expressAsyncHandler(getOrderById));

router.post('/', isAuth,expressAsyncHandler(newOrder));

router.put('/:id/pay', isAuth, expressAsyncHandler(payOrder));



const orderRoute = router
export default orderRoute