import mongoose from 'mongoose'
import cloudinary from '../cloudinary/cloudinary.js'
import productModel from '../Models/productModel.js'

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
  const { title } = req.body
  let page = req.query.page
  let size = req.query.size
  try {
    if (page) {
      page = parseInt(page)
      size = parseInt(size)
      if (title) {
        const newProduct = await productModel
          .find({ title: title })
          .skip((page - 1) * size)
          .limit(size)
        res.status(200).json(newProduct)
      } else {
        const newProduct = await productModel
          .find({})
          .skip((page - 1) * size)
          .limit(size)
        res.status(200).json(newProduct)
      }
    } else {
      const newProduct = await productModel
      res.status(200).json(newProduct)
    }
  } catch (error) {
    res.status(500).json(error)
  }
}
