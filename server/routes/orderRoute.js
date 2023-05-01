import express from 'express'
import Order from '../models/orderModel.js'
import { isAuth } from '../utils.js'
import expressAsyncHandler from 'express-async-handler';


const router = express.Router()

router.get('/:id', isAuth, expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        res.status(200);
        res.send(order)
    } else {
        res.status(404).send({ message: 'Order not found' });
    }
}))


router.post('/',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        try {

            const newOrder = new Order({
                orderItems: req.body.orderItems.map((x) => ({ ...x, product: x._id })),
                shippingAddress: req.body.shippingAddress,
                paymentMethod: req.body.paymentMethod,
                itemsPrice: req.body.itemsPrice,
                shippingPrice: req.body.shippingPrice,
                taxPrice: req.body.taxPrice,
                totalPrice: req.body.totalPrice,
                user: req.user._id,
            })
            const order = await newOrder.save();
            res.status(201).send({ message: 'New order created', order })
        } catch (err) {

            console.log('order error', err)
        }
    }
    ))


router.put('/:id/pay', isAuth, expressAsyncHandler(async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order) {
            order.isPaid = true;
            order.paidAt = Date.now();
            order.paymentResult = {
                id: req.body.id,
                status: req.body.status,
                update_time: req.body.update_time,
                email_address: req.body.email_address
            };
            const updateOrder = await order.save();
            res.status(200).send({ message: 'Order Paid', order: updateOrder })
        } else {
            res.status(404).send({ message: 'Order not found' })

        }
    } catch (err) {
        console.log(err)
    }
}))

const orderRoute = router
export default orderRoute