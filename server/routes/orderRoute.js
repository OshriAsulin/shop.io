import express from 'express'
import Order from '../models/orderModel.js'
import { isAuth } from '../utils.js'
import expressAsyncHandler from 'express-async-handler';
import { getProductById } from '../controllers/orderController.js';


const router = express.Router()


router.get('/mine', isAuth, expressAsyncHandler(async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id })
        res.status(200).send(orders)
    } catch (err) {
        res.status(404).send({ message: message.err })
        console.log(err)
    }
}))


//the same function but in two diffrent ways 

router.get('/:id', isAuth, expressAsyncHandler(getProductById))

// router.get('/:id', isAuth, expressAsyncHandler(async (req, res) => {
//     const order = await Order.findById(req.params.id);
//     if (order) {
//         res.status(200);
//         res.send(order)
//     } else {
//         res.status(404).send({ message: 'Order not found' });
//     }
// }))


router.post('/', isAuth,
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