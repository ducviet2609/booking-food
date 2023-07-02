import mongoose from 'mongoose'
import cloudinary from '../cloudinary/cloudinary.js'
import productModel from '../Models/productModel.js'
import userModel from '../models/userModel.js'
import { v4 as uuid } from 'uuid'
import OrderModel from '../models/order.js'

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

// Update Product
export const updateProduct = async (req, res) => {
  const { productId, title, description, price, number, category } = req.body
  try {
    // const newProduct = new productModel(req.body)
    const product = await productModel.findByIdAndUpdate(
      productId,
      { title, description, price, number, category },
      { new: true },
    )
    // await newProduct.save()
    res.status(200).json({ status: 1 })
  } catch (error) {
    res.status(500).json(error)
  }
}

// Delete Product
export const deleteProduct = async (req, res) => {
  const { productId } = req.body
  try {
    // const newProduct = new productModel(req.body)
    await productModel.findByIdAndDelete(productId)
    // await newProduct.save()
    res.status(200).json({ status: 1 })
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
    const product = await productModel.findById(productId)
    if (product.number > number) {
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
      await product.updateOne({ number: product.number - number })
      res.status(200).json({ status: 1 })
    } else res.status(400).json('Số lượng trong kho không đủ')
  } catch (error) {
    res.status(500).json(error)
  }
}

// Xoá khỏi giỏ hàng
export const deleteProductOnCart = async (req, res) => {
  const { cartId, userId } = req.body
  try {
    const user = await userModel.findById(userId)
    const cart = user.cart.find((item) => item.id === cartId)
    await user.updateOne({
      $pull: {
        cart: {
          id: cartId,
          // productId: cart.productId,
          // title: cart.title,
          // number: cart.number,
          // price: cart.price,
        },
      },
    })
    const product = await productModel.findById(cart.productId)
    await product.updateOne({ number: product.number + cart.number })
    res.status(200).json({ status: 1 })
  } catch (error) {
    res.status(500).json(error)
  }
}

// Order sản phẩm
export const orderProduct = async (req, res) => {
  const { listCart, userId } = req.body
  try {
    // const user = await userModel.findById(userId)
    const newOrder = new OrderModel(req.body)
    await newOrder.save()
    const user = await userModel.findById(userId)
    const listCartOld = user.cart
    const tempArray = []

    for (let item1 of listCart) {
      const id1 = item1.id
      let found = false
      for (let item2 of listCartOld) {
        const id2 = item2.id
        if (id1 === id2) {
          found = true
          break
        }
      }
      if (!found) {
        tempArray.push(item1)
      }
    }

    for (let item2 of listCartOld) {
      const id2 = item2.id
      let found = false
      for (let item1 of listCart) {
        const id1 = item1.id
        if (id2 === id1) {
          found = true
          break
        }
      }
      if (!found) {
        tempArray.push(item2)
      }
    }
    await user.updateOne({ cart: tempArray })
    res.status(200).json({ status: 1 })
  } catch (error) {
    res.status(500).json(error)
  }
}

// get list order
export const getListOrder = async (req, res) => {
  // const { listCart, userId } = req.body
  let page = req.query.page
  let size = req.query.size
  try {
    if (page) {
      page = parseInt(page)
      size = parseInt(size)
      const listOrder = await OrderModel.find({})
        .sort({ createdAt: -1 })
        .skip((page - 1) * size)
        .limit(size)
      const totalElement = await OrderModel.countDocuments()
      res.status(200).json({ data: listOrder, totalElement })
    } else {
      const listOrder = await productModel.find({})
      res.status(200).json({ data: listOrder })
    }
  } catch (error) {
    res.status(500).json(error)
  }
}

// get list order by userID
export const getListOrderById = async (req, res) => {
  const userId = req.params
  let page = req.query.page
  let size = req.query.size
  try {
    if (page) {
      page = parseInt(page)
      size = parseInt(size)
      const listOrder = await OrderModel.find({ userId: userId.userId })
        .sort({ createdAt: -1 })
        .skip((page - 1) * size)
        .limit(size)

      const totalElement = await OrderModel.countDocuments()
      res.status(200).json({ data: listOrder, totalElement })
    } else {
      const listOrder = await productModel.find({ userId: userId.userId })
      res.status(200).json({ data: listOrder })
    }
  } catch (error) {
    res.status(500).json(error)
  }
}

// xác nhận đơn hàng
export const approveOrder = async (req, res) => {
  const { type, orderId } = req.body
  try {
    const order = await OrderModel.findById(orderId)
    await order.updateOne({
      status: type,
    })
    res.status(200).json({ status: 1 })
  } catch (error) {
    res.status(500).json(error)
  }
}
