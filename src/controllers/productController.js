import Product from "../models/productModel.js";

// Create a new product
export const createProduct = async (req, res) => {
    try {
        const { name, description, price, stock, category, image } = req.body;

        const product = new Product({
            name,
            description,
            price,
            stock,
            category,
            image,
        });

        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all products
export const getAllProducts = async (req, res) => {
    try {
        const { search, category, minPrice, maxPrice, sort } = req.query;

        // Initialize filter object
        const filter = {};

        // Search functionality (name or description)
        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
            ];
        }

        // Filter by category
        if (category) {
            filter.category = category;
        }

        // Filter by price range
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = Number(minPrice);
            if (maxPrice) filter.price.$lte = Number(maxPrice);
        }

        // Find products based on the filter
        let query = Product.find(filter);

        // Sort functionality
        if (sort) {
            const sortFields = {
                price_asc: { price: 1 },
                price_desc: { price: -1 },
                name_asc: { name: 1 },
                name_desc: { name: -1 },
                createdAt_asc: { createdAt: 1 },
                createdAt_desc: { createdAt: -1 },
            };
            query = query.sort(sortFields[sort] || {}); // Default to no sorting
        }

        // Execute query and fetch products
        const products = await query;
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single product by ID
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a product
export const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a product
export const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);

        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
