import express from 'express'
import { createProduct, getProduct } from '../Controller/productController.js'
const router = express.Router()

router.post('/create-product', createProduct)
router.post('/search', getProduct)

export default router
