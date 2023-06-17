import mongoose from "mongoose";
import cloudinary from "../cloudinary/cloudinary.js";
import productModel from "../Models/productModel.js";

// Create Product
export const createProduct = async (req, res) => {
  const { name, image, description, price, number, category } = req.body;
  try {
    if (image) {
      const result = await cloudinary.uploader.upload(image, {
        upload_preset: "upload_image_unsigned",
        allowed_formats: ["png", "jpg", "jpeg", "svg", "ico", "jfif"],
      });
      const newProduct = new productModel({
        name,
        description,
        price,
        number,
        image: { public_id: result.public_id, url: result.secure_url },
        category,
      });
      await newProduct.save();
      res.status(200).json(newProduct);
    } else {
      const newProduct = new productModel(req.body);
      await newProduct.save();
      res.status(200).json(productModel);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
