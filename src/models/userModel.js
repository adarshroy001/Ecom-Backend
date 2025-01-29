import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    //   validate: {
    //     validator: function(value) {
    //       // Regex to check for at least one letter, one number, and a minimum of 8 characters
    //       return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value);
    //     },
    //     message: 'Password must be at least 8 characters long and include at least one letter and one number.',
    //   },
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  
  const User = mongoose.model('User', userSchema);
export default User;
