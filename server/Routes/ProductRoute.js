import express from "express";
import { createProduct } from "../Controller/productController.js";
const router = express.Router();

router.post("/create-product", createProduct);

export default router;
