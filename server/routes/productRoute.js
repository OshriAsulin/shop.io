import express from "express";
import data from '../data.js'
import { getAllProducts, getProductById, getProductBySlug} from '../controllers/productController.js'
import Product from "../models/productModel.js";
const router = express.Router()


router.get('/', getAllProducts)

router.get('/slug/:slug', getProductBySlug)

router.get('/:id',getProductById)



const producteRoute = router
export default producteRoute