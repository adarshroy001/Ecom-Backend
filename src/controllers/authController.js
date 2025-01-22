// Import necessary modules
import User from '../models/userModel.js';
import { OTP } from '../models/otpModel.js';
import jwt from 'jsonwebtoken';
import sendPhoneOtp from '../config/twilioConfig.js';

// Constants
const OTP_EXPIRY_TIME = 5 * 60 * 1000; // 5 minutes
const MAX_RESEND_ATTEMPTS = 5;

// Register User
export const registerUser = async (req, res) => {
  const { name, phone } = req.body;

  try {
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this phone number.' });
    }

    const newUser = new User({
      name,
      phone,
      isPhoneVerified: false,
    });
    await newUser.save();

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + OTP_EXPIRY_TIME);

    const otp = new OTP({
      userId: newUser._id,
      otpCode,
      expiresAt: otpExpiry,
      resendCount: 0,
    });
    await otp.save();

    await sendPhoneOtp(phone, otpCode);

    res.status(201).json({ message: 'User registered successfully. Please verify your phone number.' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.', error: error.message });
  }
};



