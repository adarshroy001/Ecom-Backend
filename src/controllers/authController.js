import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// Register User
export const registerUser = async (req, res) => {
  const { name, phone, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ $or: [{ phone }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this phone number or email.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      phone,
      email,
      password: hashedPassword,
      role: role || 'user',
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000, //7days
    });

    res.status(201).json({ message: 'User registered successfully.', user: { id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role } });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.', error: error.message });
  }
};

// Login User
export const loginUser = async (req, res) => {

};

// Logout User
export const logoutUser = (req, res) => {

};






