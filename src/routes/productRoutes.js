import express from "express";
import {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.post("/", createProduct); // Create
router.get("/", getAllProducts); // Read All
router.get("/:id", getProductById); // Read Single
router.put("/:id", updateProduct); // Update
router.delete("/:id", deleteProduct); // Delete

export default router;
