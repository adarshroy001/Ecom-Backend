import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId ,
        ref: 'User' ,
        reuired: true  
    },
    type: {
        type: String,
        enum: ['email', 'phone'], // OTP type
        required: true,
      },
      code: {
        type: String,
        required: true,
      },
      expiresAt: {
        type: Date,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
    }
})

export const OTP = mongoose.model('OTP' , otpSchema) ; 