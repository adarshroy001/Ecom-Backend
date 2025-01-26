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

router.post("/", upload.single("image"), createProduct); // Create
router.get("/", getAllProducts); // Read All
router.get("/:id", getProductById); // Read Single
router.put("/:id", upload.single("image"), updateProduct); // Update
router.delete("/:id", deleteProduct); // Delete

export default router;
