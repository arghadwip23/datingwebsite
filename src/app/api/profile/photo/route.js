import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req) {
  await dbConnect();

  try {
    const token = cookies().get("auth_token")?.value;
    if (!token) {
      return new Response(
        JSON.stringify({ success: false, message: "Not authenticated" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const formData = await req.formData();
    const file = formData.get("profilePhoto");

    if (!file) {
      return new Response(
        JSON.stringify({ success: false, message: "No file uploaded" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Find current user
    const user = await User.findById(decoded.userId);

    // 🗑️ Delete old photo if it exists
    if (user.profilePhoto) {
      try {
        const urlParts = user.profilePhoto.split("/");
        const fileWithExt = urlParts[urlParts.length - 1]; // e.g. "abc123.jpg"
        const publicId = fileWithExt.split(".")[0]; // "abc123"
        await cloudinary.uploader.destroy(`uploads/${publicId}`);
      } catch (err) {
        console.error("⚠️ Failed to delete old photo:", err.message);
      }
    }

    // Convert File → Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const newUrl = await uploadToCloudinary(buffer, file.name);

    // Update user profilePhoto
    user.profilePhoto = newUrl;
    await user.save();

    return new Response(
      JSON.stringify({ success: true, profilePhoto: user.profilePhoto }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("❌ Profile photo upload error:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Error uploading photo" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
