import express from 'express'
import {
  createProduct,
  getProduct,
  addProductToCart,
  orderProduct,
  getListOrder,
  approveOrder,
  getListOrderById,
} from '../Controller/productController.js'
const router = express.Router()

router.post('/create-product', createProduct)
router.post('/search', getProduct)
router.post('/add-to-card', addProductToCart)
router.post('/order', orderProduct)
router.post('/get-list-order', getListOrder)
router.post('/get-list-order/:userId', getListOrderById)
router.post('/approve-order', approveOrder)

export default router
