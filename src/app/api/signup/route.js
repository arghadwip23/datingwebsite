import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { uploadToCloudinary } from "@/lib/cloudinary";

export async function POST(req) {
  await dbConnect();

  try {
    // 1️⃣ Get form data
    const formData = await req.formData();

    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const instagram = formData.get("instagram");
    const gender = formData.get("gender");
    const location = formData.get("location");
    const relationshipGoal = formData.get("relationshipGoal");
    const lifestyle = formData.get("lifestyle");
    const weekendVibe = formData.get("weekendVibe");
    const schedule = formData.get("schedule");
    const activityLevel = formData.get("activityLevel");
    const loveLanguage = formData.get("loveLanguage");
    const profilePhoto = formData.get("profilePhoto"); // File object

    // 2️⃣ Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3️⃣ Upload image to Cloudinary (if provided)
    let profileUrl = null;
    if (profilePhoto && typeof profilePhoto.arrayBuffer === "function") {
      const arrayBuffer = await profilePhoto.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // use filename if available, otherwise fallback
      const filename = profilePhoto.name || `user_${Date.now()}`;

      profileUrl = await uploadToCloudinary(buffer, filename);
    }

    // 4️⃣ Save user to MongoDB
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      instagram,
      gender,
      location,
      relationshipGoal,
      lifestyle,
      weekendVibe,
      schedule,
      activityLevel,
      loveLanguage,
      profilePhoto: profileUrl,
    });

    await newUser.save();

    return new Response(
      JSON.stringify({ success: true, message: "User signed up successfully" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("❌ Signup error:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Error signing up user" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
