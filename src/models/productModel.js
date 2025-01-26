import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        default: '',
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        default: 0, // Tracks available quantity
    },
    category: {
        type: String,
        enum: [
            'Food:Veg', 
            'Food:Non-Veg', 
            'College Essentials', 
            'Cakes:With Egg', 
            'Cakes:No Egg', 
            'Fashion:Men', 
            'Fashion:Women', 
            'Fashion:Accessories', 
            'Bags', 
            'Footwear:Men', 
            'Footwear:Women'
        ],
        required: true,
    },
    images: {
        type: [String],
        default: [], // URL or path to the product image
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Product = mongoose.model('Product', productSchema);
export default Product;
