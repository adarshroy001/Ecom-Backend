import  User  from '../models/userModel.js'
import { OTP } from '../models/otpModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
    const { name, email, phone, password } = req.body;
    try {
        //Checking if user is already registered 
        const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
        if (existingUser) {
            return res.status(400).json({
                message: 'User already exits with this email or phone'
            })
        }
        //hashing password 
        const hashedPassword = await bcrypt.hash(password, 10);
        //saving new users 
        const newUser = new User({ name, email, phone, password: hashedPassword });
        await newUser.save();

        // Generate and save OTP
        const otpCode = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        const otp = new OTP({
            userId: newUser._id,
            type: 'email',
            code: otpCode,
            expiresAt: otpExpiry,
        })
        await otp.save();

        // Generate JWT for auto-login
        const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });

        // Set the token in an HTTP-only cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        // Respond to the client
        res.status(201).json({
            message: 'User registered and logged in successfully.',
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
            },
            otpCode, // Remove in production.
        });

    }
    catch (error) {
        res.status(500).json({ message: 'Something went wrong.', error: error.message });
    }

} 

