import Order from "../models/orderModel.js";

export async function getProductById(req, res) {
     
    // )
    const order = await Order.findById(req.params.id);
    if (order) {
        res.status(200);
        res.send(order)
    } else {
        res.status(404).send({ message: 'Order not found' });
    }
}

// export async function getProductById(req, res) {

// }