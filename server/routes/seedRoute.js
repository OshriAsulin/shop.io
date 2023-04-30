import express from 'express'
import Product from '../models/productModel.js'
import data from '../data.js';
import User from '../models/userModel.js';

const router = express.Router()

router.get('/', async (req, res) => {
    // await Product.removeAllListeners({});
    // const createdProducts = await Product.insertMany(data.products)
    // await User.removeAllListeners({});
    const createdUsers = await User.insertMany(data.users)
    res.send({ createdUsers})
})


// export default seedRouter


const seedRoute = router
export default seedRoute