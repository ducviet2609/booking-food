import mongoose from 'mongoose'
import cloudinary from '../cloudinary/cloudinary.js'
import productModel from '../Models/productModel.js'
import userModel from '../models/userModel.js'
import { v4 as uuid } from 'uuid'

// Create Product
export const createProduct = async (req, res) => {
  const { title, image, description, price, number, category } = req.body
  try {
    if (image) {
      const result = await cloudinary.uploader.upload(image, {
        upload_preset: 'upload_image_unsigned',
        allowed_formats: ['png', 'jpg', 'jpeg', 'svg', 'ico', 'jfif'],
      })
      const newProduct = new productModel({
        title,
        description,
        price,
        number,
        image: { public_id: result.public_id, url: result.secure_url },
        category,
      })
      await newProduct.save()
      res.status(200).json(newProduct)
    } else {
      const newProduct = new productModel(req.body)
      await newProduct.save()
      res.status(200).json(productModel)
    }
  } catch (error) {
    res.status(500).json(error)
  }
}

// get product
export const getProduct = async (req, res) => {
  const { title, category } = req.body
  let page = req.query.page
  let size = req.query.size
  try {
    if (page) {
      page = parseInt(page)
      size = parseInt(size)
      // tìm kiếm theo tên (title)
      if (title) {
        const newProduct = await productModel
          .find({
            title: { $regex: title, $options: 'i' },
          })
          .sort({ createdAt: -1 })
          .skip((page - 1) * size)
          .limit(size)
        const totalElement = await productModel.countDocuments()
        res.status(200).json({ data: newProduct, totalElement })
      }
      // tìm kiếm theo danh mục
      else if (category) {
        const newProduct = await productModel
          .find({
            category: category,
          })
          .sort({ createdAt: -1 })
          .skip((page - 1) * size)
          .limit(size)
        const totalElement = await productModel.countDocuments()
        res.status(200).json({ data: newProduct, totalElement })
      } else {
        const newProduct = await productModel
          .find({})
          .sort({ createdAt: -1 })
          .skip((page - 1) * size)
          .limit(size)
        const totalElement = await productModel.countDocuments()
        res.status(200).json({ data: newProduct, totalElement })
      }
    } else {
      const newProduct = await productModel.find({})
      res.status(200).json({ data: newProduct })
    }
  } catch (error) {
    res.status(500).json(error)
  }
}

// Thêm vào giỏ hàng
export const addProductToCart = async (req, res) => {
  const { productId, userId, title, number, price } = req.body
  try {
    const user = await userModel.findById(userId)
    // thêm id sản phẩm vào trường cart
    const newUser = await user.updateOne({
      $push: {
        cart: {
          id: uuid(),
          productId: productId,
          title: title,
          number: number,
          price: price,
        },
      },
    })
    const product = await productModel.findById(productId)
    await product.updateOne({ number: product.number - number })
    res.status(200).json({ status: 1 })
  } catch (error) {
    res.status(500).json(error)
  }
}

// Order sản phẩm
export const orderProduct = async (req, res) => {
  const { productId, userId, number } = req.body
  try {
    const user = await userModel.findById(userId)
    // thêm id sản phẩm vào trường cart
    const newUser = await user.updateOne({
      $push: { cart: { productId: productId, number: number } },
    })
    res.status(200).json({ stauts: 1 })
  } catch (error) {
    res.status(500).json(error)
  }
}
