import Cart from "../models/cartModel.js";

// Add item to cart
const addItemToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user.id; // Extract user ID from middleware
    try {
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({ userId, items: [{ productId, quantity }] });
        } else {
            const existingItemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
            if (existingItemIndex !== -1) {
                cart.items[existingItemIndex].quantity += quantity;
            } else {
                cart.items.push({ productId, quantity });
            }
        }

        await cart.save();
        res.status(200).json({ message: "Item added to cart successfully.", cart });
    } catch (error) {
        console.error("Error adding item to cart:", error);
        res.status(500).json({ message: "Failed to add item to cart.", error: error.message });
    }
};

//  Update cart item quantity
const updateCart = async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user.id; // Extract user ID from middleware

    try {
        const cart = await Cart.findOne({ userId });
        if (cart) {
            const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
            if (itemIndex > -1) {
                cart.items[itemIndex].quantity = quantity;
                await cart.save();
                return res.status(200).json({ message: "Cart updated successfully", cart });
            }
        }
        res.status(404).json({ error: "Product not found in cart" });
    } catch (error) {
        console.error("Error updating cart:", error);
        res.status(500).json({ message: "Failed to update cart.", error: error.message });
    }
};

//  Delete a specific cart item
const deleteCartItem = async (req, res) => {
    const { productId } = req.params; // Now extracting from params
    const userId = req.user.id; // Extract user ID from middleware

    try {
        const cart = await Cart.findOne({ userId });
        if (cart) {
            cart.items = cart.items.filter(item => item.productId.toString() !== productId);
            await cart.save();
            return res.status(200).json({ message: "Item removed from cart", cart });
        }
        res.status(404).json({ error: "Cart not found" });
    } catch (error) {
        console.error("Error removing item from cart:", error);
        res.status(500).json({ message: "Failed to remove item from cart.", error: error.message });
    }
};

//  Clear all items in the cart
const clearCart = async (req, res) => {
  const userId = req.user.id; // Extract user ID from middleware

    try {
        const cart = await Cart.findOne({ userId });
        if (cart) {
            cart.items = [];
            await cart.save();
            return res.status(200).json({ message: "Cart cleared successfully", cart });
        }
        res.status(404).json({ error: "Cart not found" });
    } catch (error) {
        console.error("Error clearing cart:", error);
        res.status(500).json({ message: "Failed to clear cart.", error: error.message });
    }
};

// Get all cart items for a user
const getCartItems = async (req, res) => {
  const userId = req.user.id; // Extract user ID from middleware

    try {
        const cart = await Cart.findOne({ userId }).populate("items.productId"); // Populate product details
        if (!cart) {
            return res.status(200).json({ message: "Cart is empty", items: [] });
        }
        res.status(200).json({ items: cart.items, totalPrice: cart.totalPrice });
    } catch (error) {
        console.error("Error fetching cart items:", error);
        res.status(500).json({ message: "Failed to fetch cart items.", error: error.message });
    }
};

export { addItemToCart, updateCart, deleteCartItem, clearCart, getCartItems };


