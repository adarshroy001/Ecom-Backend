import express from 'express';
import { registerUser, loginUser, logoutUser } from '../controllers/authController.js';

const router = express.Router();

// User registration
router.post('/new', registerUser);

// Login 
router.post('/login', loginUser);

// Logout User (dont forgot to use delete)
router.delete('/logout', logoutUser);


export default router;
