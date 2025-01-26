import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinaryConfig.js";

// Set up Cloudinary storage
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "CampusCart/Products", // Folder name in Cloudinary
        allowed_formats: ["jpg", "jpeg", "png"], // Allowed image formats
    },
});

// Multer middleware
const upload = multer({ storage });

export default upload;
