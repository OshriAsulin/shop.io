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
    try {
        const product = await Product.findById(req.params.id)
        if (product) {
            // console.log(product)
            res.send(product)
        }
        else {
            res.status(404).send({ message: 'Product Not Found' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ err: error.message })
    }
}

export async function getProductBySlug(req, res) {
    try {
        const product = await Product.findOne({ slug: req.params.slug })
        if (product) {
            // console.log(product)
            res.status(200).send(product)
        }
        else {
            res.status(404).send({ message: 'Product Not Found' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ err: error.message })
    }
}



export async function addReview(req, res) {
    try {

        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (product) {
            if (product.reviews.find((x) => x.name === req.body.name)) {
                return res
                    .status(400)
                    .send({ message: 'You already submitted a review' });
            }
console.log(req.body)
            const review = {
                name: req.body.name,
                rating: Number(req.body.rating),
                comment: req.body.comment,
            };
            product.reviews.push(review);
            product.numReviews = product.reviews.length;
            product.rating =
                product.reviews.reduce((a, c) => c.rating + a, 0) /
                product.reviews.length;
            const updatedProduct = await product.save();
            res.status(201).send({
                message: 'Review Created',
                review: updatedProduct.reviews[updatedProduct.reviews.length - 1],
                numReviews: product.numReviews,
                rating: product.rating,
            });
        } else {
            res.status(404).send({ message: 'Product Not Found' });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ err: error.message })
    }
}