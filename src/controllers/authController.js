import User from '../models/userModel.js';
import { OTP } from '../models/otpModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
  const { name, phone } = req.body;  // Only phone and name for registration

  try {
    // Check if user is already registered with this phone
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this phone number.' });
    }

    // Save new user with phone unverified
    const newUser = new User({
      name,
      phone,
      isPhoneVerified: false,
    });
    await newUser.save();

    // Generate OTP for phone verification
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);  // 5 minutes validity
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();  // 6-digit OTP

    // Save OTP
    const otp = new OTP({
      userId: newUser._id,
      otpCode,
      expiresAt: otpExpiry,
    });
    await otp.save();

    // Generate JWT for auto-login (optional for now, if you want to proceed after OTP verification)
    const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    // Set the token in an HTTP-only cookie (optional, if you're logging the user in automatically)
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Respond to the client
    res.status(201).json({
      message: 'User registered successfully. Please verify your phone number.',
      user: {
        id: newUser._id,
        name: newUser.name,
        phone: newUser.phone,
        role: newUser.role,
      },
      otpCode, // Return the OTP code temporarily (remove in production)
    });

    // Send OTP (Integrate with SMS service like Twilio here)
    // Example: sendPhoneOtp(phone, otpCode);

  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.', error: error.message });
  }
};


