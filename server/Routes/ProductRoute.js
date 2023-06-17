import express from 'express'
import {
  createProduct,
  getProduct,
  addProductToCart,
} from '../Controller/productController.js'
const router = express.Router()

router.post('/create-product', createProduct)
router.post('/search', getProduct)
router.post('/add-to-card', addProductToCart)

export default router
