import express from "express";
import { auth } from "../config/firebaseConfig.js"; // Import Firebase auth

const router = express.Router();

router.post("/send-otp", async (req, res) => {
    const { phoneNumber } = req.body; // Format: +919876543210

    try {
        const sessionInfo = await auth.createUserWithPhoneNumber(phoneNumber);
        res.status(200).json({ sessionInfo });
    } catch (error) {
        console.error("Error sending OTP:", error);
        res.status(500).json({ message: "Failed to send OTP", error });
    }
});

//Verifying Otp
router.post("/verify-otp", async (req, res) => {
    const { sessionInfo, otp } = req.body;

    try {
        const user = await auth.signInWithPhoneNumber(sessionInfo, otp);
        res.status(200).json({ message: "OTP Verified", user });
    } catch (error) {
        console.error("Error verifying OTP:", error);
        res.status(500).json({ message: "Invalid OTP", error });
    }
});


export default router;
