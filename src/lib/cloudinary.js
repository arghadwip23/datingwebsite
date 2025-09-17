// Later replace with Cloudinary SDK logic
// This mock just returns a fake URL with timestamp

export default async function uploadToCloudinary(file) {
  // file = formidable uploaded file object
  const fakeUrl = `https://res.cloudinary.com/demo/image/upload/v${Date.now()}/${file.originalFilename}`;
  return fakeUrl;
}
