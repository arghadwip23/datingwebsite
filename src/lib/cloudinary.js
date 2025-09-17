import cloudinary from 'cloudinary';

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadToCloudinary(filePath, folder = 'uploads') {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(
      filePath,
      { folder },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
  });
}
