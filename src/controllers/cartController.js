import Cart from '../models/cartModel.js'

export default addItemToCart = async (req,res)=>{
    const {productId , quantity}  = req.body ; 
    const userId = req.user._id; 

    try {
        let cart = await Cart.findOne({userId}) ;
        if (!cart) {
            //if no cart than create cart 
            cart = new Cart({ userId, items: [{ productId, quantity }] });
            res.response(200).json({message:'Cart was not existing so we created new Cart and added product '})
        }
         // Update existing cart
         //checking is that product exits 
        const existingItemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (existingItem) {
            cart.items[existingItemIndex].quantity = quantity + 1; // Update quantity
        }
        else{
            cart.items.push({productId,quantity}) // Add new item
        }
        await cart.save();
        res.status(200).json({ message: 'Item added to cart successfully.', cart });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add item to cart.', error });
    }
}