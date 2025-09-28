import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

// Setup Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'social_media_app', // Cloudinary folder
    allowed_formats: ['jpg', 'jpeg', 'png', 'mp4', 'mov'], // allowed file types
  },
});

// Multer middleware
const upload = multer({ storage });

export default upload;
