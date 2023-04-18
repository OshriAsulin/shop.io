import express from "express";
import data from '../data.js'
const router = express.Router()


router.get('/', (req, res) => {
    res.send(data.products)
})

router.get('/slug/:slug', async (req, res) => {
    const product = await data.products.find(x => x.slug === req.params.slug)
    if (product) {
        console.log(product)
        res.send(product)
    }
    else {
        res.status(404).send({ message: 'Product Not Found' })
    }
})



const producteRoute = router
export default producteRoute