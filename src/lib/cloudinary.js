// src/lib/cloudinary.js
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadToCloudinary(buffer, filename, folder = "uploads") {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, public_id: filename.split(".")[0] }, // keep filename
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    );

    stream.end(buffer); // send the buffer to cloudinary
  });
}
