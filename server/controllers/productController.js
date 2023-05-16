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


export async function getCategories(req, res) {
    try {
        const categories = await Product.find().distinct('category');
        if (categories) {
            res.status(200).send(categories)
        }
        else {
            res.status(404).send({ message: 'Ctegories Not Found' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ err: error.message })
    }
}


const PAGE_SIZE = 3;


export async function searchProduct(req, res) {
    const { query } = req;
    const pageSize = query.pageSize || PAGE_SIZE;
    const page = query.page || 1;
    const category = query.category || '';
    const price = query.price || '';
    const rating = query.rating || '';
    const order = query.order || '';
    const searchQuery = query.query || '';

    const queryFilter =
        searchQuery && searchQuery !== 'all'
            ? {
                name: {
                    $regex: searchQuery,
                    $options: 'i',
                },
            }
            : {};
    const categoryFilter = category && category !== 'all' ? { category } : {};
    const ratingFilter =
        rating && rating !== 'all'
            ? {
                rating: {
                    $gte: Number(rating),
                },
            }
            : {};
    const priceFilter =
        price && price !== 'all'
            ? {
                // 1-50
                price: {
                    $gte: Number(price.split('-')[0]),
                    $lte: Number(price.split('-')[1]),
                },
            }
            : {};
    const sortOrder =
        order === 'featured'
            ? { featured: -1 }
            : order === 'lowest'
                ? { price: 1 }
                : order === 'highest'
                    ? { price: -1 }
                    : order === 'toprated'
                        ? { rating: -1 }
                        : order === 'newest'
                            ? { createdAt: -1 }
                            : { _id: -1 };

    try {

        const products = await Product.find({
            ...queryFilter,
            ...categoryFilter,
            ...priceFilter,
            ...ratingFilter,
        })
            .sort(sortOrder)
            .skip(pageSize * (page - 1))
            .limit(pageSize);

        const countProducts = await Product.countDocuments({ ...queryFilter, ...categoryFilter, ...priceFilter, ...ratingFilter });
        res.send({ products, countProducts, page, pages: Math.ceil(countProducts / pageSize) });

    } catch (error) {
        console.log(error)
        res.status(500).json({ err: error.message })
    }
}
