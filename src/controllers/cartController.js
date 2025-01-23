import Cart from '../models/cartModel.js';

const addItemToCart = async (req, res) => {
    const { productId, quantity } = req.body; 
    const userId = req.user._id; // Extract user ID from middleware

    try {
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            // Create a new cart if it doesn't exist
            cart = new Cart({ userId, items: [{ productId, quantity }] });
        } else {
            // Check if the product already exists in the cart
            const existingItemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
            if (existingItemIndex !== -1) {
                // Update quantity if the product already exists
                cart.items[existingItemIndex].quantity += quantity;
            } else {
                // Add a new product to the cart
                cart.items.push({ productId, quantity });
            }
        }

        await cart.save();
        res.status(200).json({ message: 'Item added to cart successfully.', cart });
    } catch (error) {
        console.error('Error adding item to cart:', error); // Debug log
        res.status(500).json({ message: 'Failed to add item to cart.', error });
    }
};

export default addItemToCart;
