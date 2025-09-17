import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET(req) {
  await dbConnect();

  try {
    const cookieStore = cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return new Response(
        JSON.stringify({ success: false, message: "Not authenticated" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return new Response(
        JSON.stringify({ success: false, message: "User not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, user }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("❌ Profile GET error:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Error fetching profile" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function PUT(req) {
  const token = cookies().get("auth_token")?.value;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const updates = await req.json();

  const user = await User.findByIdAndUpdate(
    decoded.userId,
    updates,
    { new: true }
  ).select("-password");

  return new Response(JSON.stringify({ success: true, user }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
