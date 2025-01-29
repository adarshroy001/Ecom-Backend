import express from 'express';
import { registerUser, loginUser, logoutUser ,getUserInfo} from '../controllers/authController.js';
import isAuthenticated from '../middleware/authMiddleware.js';

const router = express.Router();

// User registration
router.post('/new', registerUser);

// Login 
router.post('/login', loginUser);

// Logout User (dont forgot to use delete)
router.delete('/logout', logoutUser);
// getUserInfo  
router.get('/getUserInfo', isAuthenticated,getUserInfo);


export default router;
