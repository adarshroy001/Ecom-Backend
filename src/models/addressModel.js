import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 13,
    },
    street: {
        type: String,
        required: true,
    },
    apartment: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    zipCode: {
        type: Number,
        required: true,
        minlength: 6,
        maxlength: 6,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Address = mongoose.model("Address", addressSchema);
export default Address;
