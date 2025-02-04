import express from "express";
import { 
    addItemToCart, 
    updateCart, 
    deleteCartItem, 
    clearCart, 
    getCartItems 
} from "../controllers/cartController.js";
import isAuthenticated from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", isAuthenticated, getCartItems); // Get all cart products for a user
router.post("/add", isAuthenticated, addItemToCart); // Add an item to the cart
router.put("/update", isAuthenticated, updateCart); // Update cart item quantity
router.delete("/remove/:productId", isAuthenticated, deleteCartItem); // Remove a specific item from cart
router.delete("/clear", isAuthenticated, clearCart); // Clear all items from the cart

export default router;
