import express from "express";
import Product from "../models/productModel.js"
const router = express.Router();

// GET /api/products/search?query=laptop
router.get("/", async (req, res) => {
    const { query } = req.query;
    const filter = query ? { name: { $regex: query, $options: "i" } } : {};
    const products = await Product.find(filter);
    res.json(products);
  });
  
  
export default router;
