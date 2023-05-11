import express from "express";
import data from '../data.js'
import { addReview, getAllProducts, getProductById, getProductBySlug} from '../controllers/productController.js'
import Product from "../models/productModel.js";
const router = express.Router()


router.get('/', getAllProducts);

router.get('/:id',getProductById);

router.get('/slug/:slug', getProductBySlug);

router.post('/:id/reviews', addReview);



const producteRoute = router
export default producteRoute