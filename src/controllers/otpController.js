// import { OTP } from '../models/otpModel.js';
// import User from '../models/userModel.js';
// import jwt from 'jsonwebtoken';

// // Verify OTP
// export const verifyOtp = async (req, res) => {
//   const { phone, otpCode } = req.body;

//   try {
//     const user = await User.findOne({ phone });
//     if (!user) return res.status(404).json({ message: 'User not found.' });

//     if (user.isPhoneVerified) return res.status(400).json({ message: 'Phone number already verified.' });

//     const otpRecord = await OTP.findOne({ userId: user._id, otpCode });
//     if (!otpRecord) return res.status(400).json({ message: 'Invalid OTP.' });

//     if (otpRecord.expiresAt < new Date()) {
//       return res.status(400).json({ message: 'OTP has expired.' });
//     }

//     user.isPhoneVerified = true;
//     await user.save();
//     await OTP.deleteMany({ userId: user._id });

//     const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
//     res.cookie('token', token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       maxAge: 7 * 24 * 60 * 60 * 1000,
//     });

//     res.status(200).json({ message: 'Phone number verified successfully.' });
//   } catch (error) {
//     res.status(500).json({ message: 'Something went wrong.', error: error.message });
//   }
// };


// // Resend OTP
// export const resendOtp = async (req, res) => {
//   const { phone } = req.body;

//   try {
//     const user = await User.findOne({ phone });
//     if (!user) return res.status(404).json({ message: 'User not found with this phone number.' });

//     const latestOtp = await OTP.findOne({ userId: user._id }).sort({ createdAt: -1 });

//     if (latestOtp && latestOtp.resendCount >= MAX_RESEND_ATTEMPTS) {
//       return res.status(400).json({ message: 'Maximum resend attempts reached. Please try again later.' });
//     }

//     const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
//     const otpExpiry = new Date(Date.now() + OTP_EXPIRY_TIME);

//     const otp = new OTP({
//       userId: user._id,
//       otpCode,
//       expiresAt: otpExpiry,
//       resendCount: latestOtp ? latestOtp.resendCount + 1 : 1,
//     });
//     await otp.save();

//     // Send OTP via Firebase
//     await auth.sendVerificationCode(phone, otpCode);  // Firebase OTP method
//     res.status(200).json({ message: 'OTP sent successfully. Please check your phone.' });
//   } catch (error) {
//     res.status(500).json({ message: 'Something went wrong.', error: error.message });
//   }
// };

