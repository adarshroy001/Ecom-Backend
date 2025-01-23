import express from 'express' 
import isAuthenticated from '../middleware/authMiddleware.js'
import addItemToCart from '../controllers/cartController.js'

const router = express.Router() ; 

router.post('/add-to-cart',isAuthenticated,addItemToCart) ;

export default router;