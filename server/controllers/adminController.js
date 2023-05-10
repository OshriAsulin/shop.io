import Order from "../models/orderModel.js";
import User from "../models/userModel.js"
import Product from "../models/productModel.js"

export async function getAllUsers(req, res) {
    try {
        const users = await User.find({});
        res.status(200).send(users)
    } catch (err) {
        res.status(500).json({ message: "error from send the users" })
    }
}

export async function deleteUser(req, res) {
    try {
        const user = await User.deleteOne({ _id: req.params.id })

        if (!user) {
            res.status(500).send({ message: "Use rNot found" })
            return
        } else {
            res.status(200).send({ message: `User has been deleted, ${user._id}` })
        }

    } catch (error) {
        res.status(500).send({ message: error.message })

    }
}



export async function summaryOrders(req, res) {

    const orders = await Order.aggregate([
        {
            $group: {
                _id: null,
                numOrders: { $sum: 1 },
                totalSales: { $sum: '$totalPrice' },
            },
        },
    ]);
    const users = await User.aggregate([
        {
            $group: {
                _id: null,
                numUsers: { $sum: 1 },
            },
        },
    ]);
    const dailyOrders = await Order.aggregate([
        {
            $group: {
                _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
                orders: { $sum: 1 },
                sales: { $sum: '$totalPrice' },
            },
        },
        { $sort: { _id: 1 } },
    ]);
    const productCategories = await Product.aggregate([
        {
            $group: {
                _id: '$category',
                count: { $sum: 1 },
            },
        },
    ]);
    res.send({ users, orders, dailyOrders, productCategories });
}

const PAGE_SIZE = 3;

export async function getProducts(req, res) {
    try {
        const { query } = req;
        const page = query.page || 1;
        const pageSize = query.pageSize || PAGE_SIZE;

        const products = await Product.find()
            .skip(pageSize * (page - 1))
            .limit(pageSize);
        const countProducts = await Product.countDocuments();
        res.send({
            products,
            countProducts,
            page,
            pages: Math.ceil(countProducts / pageSize),
        });

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


// complete this function
export async function deleteProduct(req, res) {
    try {
        // const product = req.params.id
        console.log(req.params)
        const product = await Product.deleteOne({ _id: req.params.id });
        if (product) {
            res.status(200).send({ message: 'Product has been Deleted' });
        } else {
            res.status(404).send({ message: 'Product Not Found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


// use it in edit user
export async function getUser(req, res) {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            res.send(user);
        } else {
            res.status(404).send({ message: 'User Not Found' });
        }

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}



export async function addProduct(req, res) {
    try {
        const product = req.body
        if (!product) {
            res.status(404).send({ message: "error in added product, try again" });
            return;
        }
        const newProduct = await new Product({
            name: product.name,
            slug: product.name.toLowerCase(),
            image: product.image,
            brand: product.brand,
            description: product.description,
            category: product.category,
            price: product.price,
            countInStock: product.countInStock,
            numReviews: 5,
            rating: 4
        })
        await newProduct.save()
        res.status(200).send({ message: `product is added successfully, ${newProduct}` })
        console.log(newProduct)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export async function updateProduct(req, res) {
    try {
        // const currentProduct = req.body.params
        // if(!currentProduct){
        //     res.status(404). send({message : "error in updated product, try again"});
        //     return;
        // }
        const product = req.body
        const currentProduct = await Product.findOne({ _id: req.prams.id });
        currentProduct.name = product.name,
            currentProduct.slug = product.name.toLowerCase(),
            currentProduct.image = product.image,
            currentProduct.brand = product.brand,
            currentProduct.description = product.description,
            currentProduct.category = product.category,
            currentProduct.price = product.price,
            currentProduct.countInStock = product.countInStock,
            currentProduct.numReviews = product.numReviews,
            currentProduct.rating = product.numReviews
        await currentProduct.save()
        res.status(200).send({ message: `product is added successfully, ${currentProduct}` })
        console.log(newProduct)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

