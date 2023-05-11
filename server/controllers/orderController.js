import Order from "../models/orderModel.js";


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

// here implement send email about the new order
// const updatedOrder = await order.save();
// mailgun()
//   .messages()
//   .send(
//     {
//       from: 'Amazona <amazona@mg.yourdomain.com>',
//       to: `${order.user.name} <${order.user.email}>`,
//       subject: `New order ${order._id}`,
//       html: payOrderEmailTemplate(order),
//     },
//     (error, body) => {
//       if (error) {
//         console.log(error);
//       } else {
//         console.log(body);
//       }
//     }
//   );


            res.status(200).send({ message: 'Order Paid', order: updateOrder })
        } else {
            res.status(404).send({ message: 'Order not found' })

        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })

    }
}





