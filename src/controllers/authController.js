import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { messaging } from 'firebase-admin';

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
    res.status(500).json({ message: 'Facing Error in Signup Controller . Something went wrong.', error: error.message });
  }
};

// Login User
export const loginUser = async (req, res) => {
 const {email , password} = req.body ; 
 try{
   //checking is user exits with this email 
   const existingUser = await User.findOne({email}) ;
   if(!existingUser){
    return res.status(404).json({message: 'User is not registered with This email'})
   }
     //checking password 
     const isPasswordValid = await bcrypt.compare(password, existingUser.password);
     if(!isPasswordValid) return res.status(400).json({message: 'Incorrect Password please Try again'})
    const token = jwt.sign({ id: existingUser._id, role: existingUser.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.cookie('token',token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000,});
      res.status(200).json({ message: 'Login successful.', user: { id: user._id, name: user.name, email: user.email, role: user.role } });
 } catch (error) {
  res.status(500).json({ message: 'Facing Error in Login Controller . Something went wrong.', error: error.message });
}
};

// Logout User
export const logoutUser = (req, res) => {

};






