import express from 'express'
import { getCartByUser } from '../Controller/UserController.js'
const router = express.Router()

router.get('/get-cart/:userId', getCartByUser)

export default router
