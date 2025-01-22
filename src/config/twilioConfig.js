import twilio from 'twilio';
import User from '../models/userModel.js';

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
export const  sendPhoneOtp =  async (phone, otpCode) => {
        try {
            const message = await client.messages.create({
                body: `Your OTP code is: ${otpCode}`,
                from: process.env.TWILIO_PHONE_NUMBER,  // Your Twilio phone number
                to: phone,  // Recipient's phone number
            });
    }
    catch(error){
        console.error('Error in  sending OTP via twilio:', error.message);
    }
}