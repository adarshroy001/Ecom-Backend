import { OTP } from '../models/otpModel.js';
import User from '../models/userModel.js';

export const verifyOtp = async (req, res) => {
    const { phone, otpCode } = req.body;

    try {
        // Find the user by phone number
        const user = await User.findOne({ phone });
        if (!user) {
            return res.status(404).json({ message: 'User not found with this phone number.' });
        }

        // Find the OTP record for the user
        const otpRecord = await OTP.findOne({ userId: user._id, otpCode });

        if (!otpRecord) {
            return res.status(400).json({ message: 'Invalid OTP.' });
        }

        // Check if OTP has expired
        if (otpRecord.expiresAt < Date.now()) {
            return res.status(400).json({ message: 'OTP has expired.' });
        }

        // If OTP is valid, verify phone and delete OTP record
        user.isPhoneVerified = true;
        await user.save();

        // Delete the OTP record since it's been used
        await OTP.deleteOne({ _id: otpRecord._id });

        res.status(200).json({
            message: 'Phone number verified successfully.',
            user: {
                id: user._id,
                name: user.name,
                phone: user.phone,
                isPhoneVerified: user.isPhoneVerified,
            },
        });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong.', error: error.message });
    }
};

export const resendOtp = async (req, res) => {
    const { phone } = req.body;

    try {
        // Find the user by phone number
        const user = await User.findOne({ phone });
        if (!user) {
            return res.status(404).json({ message: 'User not found with this phone number.' });
        }

        // Check the OTP resend count and add some timeout logic (e.g., increment timeout for each retry)
        const latestOtp = await OTP.findOne({ userId: user._id }).sort({ createdAt: -1 });

        if (latestOtp && latestOtp.resendCount >= 5) {
            return res.status(400).json({ message: 'Maximum resend attempts reached. Please try again later.' });
        }

        // Generate a new OTP
        const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);  // 5 minutes validity
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();  // 6-digit OTP

        // Save the new OTP
        const otp = new OTP({
            userId: user._id,
            otpCode,
            expiresAt: otpExpiry,
            resendCount: latestOtp ? latestOtp.resendCount + 1 : 0,
        });
        await otp.save();

        res.status(200).json({
            message: 'OTP sent successfully. Please check your phone.',
            resendCount: otp.resendCount,
        });

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong.', error: error.message });
    }
};

