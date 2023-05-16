import express from "express";
import data from '../data.js'
import { addReview, getAllProducts, getCategories, getProductById, getProductBySlug, searchProduct} from '../controllers/productController.js'
import Product from "../models/productModel.js";
const router = express.Router()


router.get('/', getAllProducts);

router.get('/categories', getCategories);

router.get('/search', searchProduct);

router.get('/:id',getProductById);

router.get('/slug/:slug', getProductBySlug);

router.post('/:id/reviews', addReview);




const producteRoute = router
export default producteRoute