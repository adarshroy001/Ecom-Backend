import cloudinary from "../config/cloudinaryConfig.js";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "CampusCart/Products", // Base folder
        allowed_formats: ["jpg", "jpeg", "png"],
    },
});

// Multer middleware for multiple files
const upload = multer({ storage });
export default upload;

