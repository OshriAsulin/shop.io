import express from "express";
import data from '../data.js'
import { getAllProducts, getProductById, getProductBySlug} from '../controllers/productController.js'
import Product from "../models/productModel.js";
const router = express.Router()


router.get('/', getAllProducts);

router.get('/:id',getProductById);

router.get('/slug/:slug', getProductBySlug);



const producteRoute = router
export default producteRoute