"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import ProfilePic from "@/components/profile/ProfilePic";
import ProfilePreferences from "@/components/profile/ProfilePreference";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null); // ✅ define user state

  // Fetch profile data
  useEffect(() => {
    (async () => {
      const res = await fetch("/api/profile");
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        router.push("/login");
      }
    })();
  }, [router]);

  // Handle photo upload
  const handleUpload = async (file) => {
    const data = new FormData();
    data.append("profilePhoto", file);

    await toast.promise(
      fetch("/api/profile/photo", {
        method: "POST",
        body: data,
      }).then((res) => {
        if (!res.ok) throw new Error("Failed to upload photo");
        return res.json();
      }),
      {
        loading: "Uploading photo...",
        success: "Profile picture updated 🎉",
        error: "Upload failed 😭",
      }
    ).then((res) => {
      if (res?.profilePhoto) {
        setUser((prev) => ({ ...prev, profilePhoto: res.profilePhoto })); // ✅ update state
      }
    });
  };
 
  const handlePreferenceChange = (field, value) => {
    setUser((prev) => ({ ...prev, [field]: value }));
  };

  if (!user) {
    return <div className="p-6 text-center">Loading profile...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white shadow-sm rounded-lg p-8 w-full max-w-2xl space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900 text-center">
          My Profile
        </h2>

        {/* Profile Picture */}
        <ProfilePic
          src={user.profilePhoto}
          editable={true}
          onUpload={handleUpload}
        />
      <ProfilePreferences
        preferences={user}
        editable={true}   // toggle edit/view mode
        onChange={handlePreferenceChange}
      />

        {/* Basic Details */}
        <div className="space-y-2 text-sm text-gray-700">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Instagram:</strong> {user.instagram}</p>
          <p><strong>Location:</strong> {user.location}</p>
        </div>
      </div>

      <Toaster position="top-right" />
    </div>
  );
}
