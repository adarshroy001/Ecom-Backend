import express from 'express';
import isAuthenticated from '../middleware/authMiddleware.js';
import { addItemToCart, updateCart, deleteCartItem, clearCart } from '../controllers/cartController.js';

const router = express.Router();

// Add an item to the cart
router.post('/cart/add', isAuthenticated, addItemToCart);

// Update an item's quantity in the cart
router.patch('/cart/update', isAuthenticated, updateCart);

// Delete a specific item from the cart
router.delete('/cart/item/delete', isAuthenticated, deleteCartItem);

// Clear the entire cart
router.delete('/cart/clear', isAuthenticated, clearCart);

export default router;
