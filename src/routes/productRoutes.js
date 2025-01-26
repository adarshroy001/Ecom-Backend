import express from "express";
import {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
} from "../controllers/productController.js";
import upload from "../middleware/multerMiddleware.js";

const router = express.Router();

// Add a new product with image uploads
router.post("/add", upload.array("images", 5), createProduct); 

// Update an existing product with image uploads
router.put("/:id", upload.array("images", 5), updateProduct);

// Get all products
router.get("/", getAllProducts); // Read All

// Get a single product by ID
router.get("/:id", getProductById); // Read Single

// Delete a product by ID
router.delete("/:id", deleteProduct); // Delete

export default router;

