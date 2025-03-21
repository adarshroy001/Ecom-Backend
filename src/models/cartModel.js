import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
                default: 1,
            }
        }
    ],
    totalPrice: {
        type: Number,
        default: 0,  // You can calculate this dynamically
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Middleware to calculate `totalPrice` before saving
cartSchema.pre("save", async function (next) {
    try {
        // Populate product details to get price
        await this.populate("items.productId");

        // Calculate total price
        this.totalPrice = this.items.reduce((sum, item) => {
            return sum + item.productId.price * item.quantity;
        }, 0);

        next();
    } catch (error) {
        next(error);
    }
});


const Cart = mongoose.model('Cart', cartSchema);
export default Cart;
