import { v2 as cloudinary } from "cloudinary";
import dotenv  from 'dotenv' ; 
dotenv.config() ; 

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Add your cloud name
    api_key: process.env.CLOUDINARY_API_KEY, // Add your API key
    api_secret: process.env.CLOUDINARY_API_SECRET, // Add your API secret
});

export default cloudinary;
