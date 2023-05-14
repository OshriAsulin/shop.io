import Order from "../models/orderModel.js";
import Stripe from "stripe";
import { payOrderEmailTemplate } from "../utils.js";
const stripe = new Stripe('sk_test_51N5omEDHCT4oK604Dlsg9jkryE7ZwpiGWFJLOrwzliavJAOLN9QkqfEzevAwy5x507sN9xPSEwIFLVmv64LoPEUC008maNXawp')

export async function getOrderByUser(req, res) {
    try {
        const orders = await Order.find({ user: req.user._id })
        res.status(200).send(orders)
    } catch (error) {
        console.log(error)
        res.status(404).send({ message: error.message })
    }
}


export async function getOrderById(req, res) {
    try {
        const order = await Order.findById(req.params.id);
        if (order) {
            res.status(200);
            res.send(order)
        } else {
            res.status(404).send({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export async function newOrder(req, res) {
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
        console.log(order)
        res.status(201).send({ message: 'New order created', order })
    } catch (error) {
        console.log('order error', error)
        res.status(500).json({ message: error.message })
    }
}

export async function payOrder(req, res) {
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
            const user = req.user
            payOrderEmailTemplate(order, user)



            res.status(200).send({ message: 'Order Paid', order: updateOrder })
        } else {
            res.status(404).send({ message: 'Order not found' })

        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}


export async function payOrderByStripe(req, res) {
    try {
        const { token, amount } = req.body
        const newStripePayment = await stripe.charges.create({
            source: token.id,
            amount,
            currency: 'usd',
        })
        const transactionObject = await newStripePayment
        // console.log('transaction----------------',transactionObject)
        const transactionDetails = {
            user: req.user,
            transaction: transactionObject
        }
        res.status(200).json({ message: `pay with stripe is successfully`, details: transactionDetails })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}


export async function updateOrder(req, res) {
    console.log('email update----------------', req.user)
    const order = await Order.findById(req.params.id);
    console.log('order-------------', order)
    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: "COMPLETE",
            update_time: Date.now(),
            email_address: req.user.email
        };
     
        const updateOrder = await order.save();
        const user = req.user;
        payOrderEmailTemplate(order, user)
        res.status(200).send({ message: 'Order Paid', order: updateOrder })
    } else {
        res.status(404).send({ message: 'Order not found' })
    }

}




