// import twilio from 'twilio';
// import dotenv from 'dotenv';
// dotenv.config();


// const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

// export const sendPhoneOtp = async (phone, otpCode) => {
//     console.log('TWILIO_PHONE_NUMBER:', process.env.TWILIO_PHONE_NUMBER);
//     console.log('Phone:', phone);

//     try {
//         const message = await client.messages.create({
//             body: `Your OTP code is: ${otpCode}`,
//             from: `+${process.env.TWILIO_PHONE_NUMBER}`, // Ensure no spaces
//             to: `+919973992132`, // Sanitize phone input
//         });
//         console.log('OTP sent successfully:', message.sid);
//     } catch (error) {
//         console.error('Error in sending OTP via Twilio:', {
//             message: error.message,
//             stack: error.stack,
//             code: error.code,
//             response: error.response?.data,
//         });
//     }
// };
