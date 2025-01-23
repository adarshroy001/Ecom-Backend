import express from 'express';
import { registerUser, verifyOtp, resendOtp } from '../controllers/authController.js';

const router = express.Router();

// User registration with OTP
router.post('/new', registerUser);

// OTP verification
router.post('/verify-otp', verifyOtp);

// Resend OTP
router.post('/resend-otp', resendOtp);

export default router;
