import Product from '../models/productModel.js'

export async function getAllProducts(req, res) {
    try {
        const products = await Product.find()
        res.status(200)
        res.send(products)
    } catch (err) {
        console.log(err)
        res.status(404).json({ msg: 'error when get the products from db' })
    }
}

export async function getProductById(req, res) {
    const product = await Product.findById(req.params.id)
    if (product) {
        console.log(product)
        res.send(product)
    }
    else {
        res.status(404).send({ message: 'Product Not Found' })
    }
}

export async function getProductBySlug(req, res) {
    const product = await Product.findOne({ slug: req.params.slug })
    if (product) {
        console.log(product)
        res.send(product)
    }
    else {
        res.status(404).send({ message: 'Product Not Found' })
    }
}