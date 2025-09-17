"use client"

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profilePhoto: null,
    instagram: "",
    gender: "",
    location: "",
    relationshipGoal: "",
    lifestyle: "",
    weekendVibe: "",
    schedule: "",
    activityLevel: "",
    loveLanguage: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Location check
    if (!formData.location.toLowerCase().includes("vit chennai")) {
      toast.error("Sorry cutie 😭 Only lovebirds from VIT Chennai or nearby can join!");
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    try {
      const res = await axios.post("/api/signup", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status === 200) {
        toast.success("Yay! 🎉 You’re in. Let’s find your soulmate 💕");
        setTimeout(() => router.push("/login"), 1500);
      }
    } catch (err) {
      toast.error("Signup failed 😭 Try again, superstar!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-sm rounded-lg p-8 w-full max-w-2xl space-y-6"
      >
        <h2 className="text-2xl font-normal text-gray-900 text-center">
          Create your account
        </h2>
        <div className="space-y-2 text-center">
          <p className="text-gray-500 text-sm">
            For VIT Chennai students only. Your information is kept private.
          </p>
          <p className="text-gray-600 text-sm font-medium">
            All questions are required to find your perfect match
          </p>
        </div>

        {/* All form fields in single column */}
        <div className="space-y-4">
          <div className="space-y-2">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-200 rounded-md text-sm text-gray-700 placeholder-gray-500"
            />
            <span className="text-sm text-gray-500 pl-2">Enter your full name as per college ID</span>
          </div>

          <div className="space-y-2">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-200 rounded-md text-sm text-gray-700 placeholder-gray-500"
            />
            <span className="text-sm text-gray-500 pl-2">Use your VIT email address (@vitstudent.ac.in)</span>
          </div>

          <div className="space-y-2">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={8}
              className="w-full p-3 border border-gray-200 rounded-md text-sm text-gray-700 placeholder-gray-500"
            />
            <span className="text-sm text-gray-500 pl-2">Must be at least 8 characters long</span>
          </div>

          <div className="space-y-2">
            <div className="flex flex-col space-y-2">
              <label 
                htmlFor="profilePhoto" 
                className="w-fit px-4 py-2 bg-gray-100 text-gray-700 rounded-md text-sm cursor-pointer hover:bg-gray-200 transition-colors"
              >
                Choose Profile Photo
              </label>
              <input
                id="profilePhoto"
                type="file"
                name="profilePhoto"
                accept="image/*"
                onChange={handleChange}
                required
                className="hidden"
              />
              <span className="text-sm text-gray-500">
                {formData.profilePhoto ? formData.profilePhoto.name : "No file chosen"}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <input
              type="text"
              name="instagram"
              placeholder="Instagram Handle"
              value={formData.instagram}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-200 rounded-md text-sm text-gray-700 placeholder-gray-500"
            />
            <span className="text-sm text-gray-500 pl-2">Enter without @ symbol (e.g. johndoe)</span>
          </div>

          <div className="space-y-2">
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-200 rounded-md text-sm text-gray-700 placeholder-gray-500"
            />
            <span className="text-sm text-gray-500 pl-2">Must be VIT Chennai or nearby areas</span>
          </div>

          <div className="space-y-2">
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-200 rounded-md text-sm text-gray-700"
            >
              <option value="" className="text-gray-500">Select Gender Preference</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="any">No Preference</option>
            </select>
          </div>

          <div className="space-y-2">
            <select
              name="relationshipGoal"
              value={formData.relationshipGoal}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-200 rounded-md text-sm text-gray-700"
            >
              <option value="" className="text-gray-500">What are you looking for?</option>
              <option value="longTerm">Long-term relationship</option>
              <option value="casual">Something casual</option>
            </select>
          </div>

          <div className="space-y-2">
            <select
              name="lifestyle"
              value={formData.lifestyle}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-200 rounded-md text-sm text-gray-700"
            >
              <option value="" className="text-gray-500">Which best describes your lifestyle?</option>
              <option value="social">Social butterfly (love going out, events, meeting people)</option>
              <option value="balanced">Balanced (a mix of going out and quiet time)</option>
              <option value="lowKey">Low-key (prefer home, cozy nights, fewer social outings)</option>
            </select>
          </div>

          <div className="space-y-2">
            <select
              name="weekendVibe"
              value={formData.weekendVibe}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-200 rounded-md text-sm text-gray-700"
            >
              <option value="" className="text-gray-500">What's your weekend vibe?</option>
              <option value="outdoorsy">Outdoorsy/adventurous</option>
              <option value="homebody">Relaxing at home</option>
              <option value="explorer">Exploring food, culture, or nightlife</option>
              <option value="productive">Catching up on hobbies/work</option>
            </select>
          </div>

          <div className="space-y-2">
            <select
              name="schedule"
              value={formData.schedule}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-200 rounded-md text-sm text-gray-700"
            >
              <option value="" className="text-gray-500">Are you more of a...</option>
              <option value="earlyBird">Early bird</option>
              <option value="nightOwl">Night owl</option>
              <option value="flexible">Flexible / depends on the day</option>
            </select>
          </div>

          <div className="space-y-2">
            <select
              name="activityLevel"
              value={formData.activityLevel}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-200 rounded-md text-sm text-gray-700"
            >
              <option value="" className="text-gray-500">How active are you?</option>
              <option value="veryActive">Very active (sports, gym, outdoors often)</option>
              <option value="moderatelyActive">Moderately active (occasional exercise, walking, casual sports)</option>
              <option value="notActive">Not active (prefer relaxing, low physical activity)</option>
            </select>
          </div>

          <div className="space-y-2">
            <select
              name="loveLanguage"
              value={formData.loveLanguage}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-200 rounded-md text-sm text-gray-700"
            >
              <option value="" className="text-gray-500">What's your love language?</option>
              <option value="wordsOfAffirmation">Words of affirmation</option>
              <option value="qualityTime">Quality time</option>
              <option value="actsOfService">Acts of service</option>
              <option value="physicalTouch">Physical touch</option>
              <option value="gifts">Gifts</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white p-3 rounded-md hover:bg-gray-800 transition-colors text-sm font-medium"
        >
          Create Account
        </button>
      </form>

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#18181b",
            color: "#fff",
            borderRadius: "6px",
            fontSize: "14px",
          },
          success: {
            iconTheme: {
              primary: "#fff",
              secondary: "#18181b",
            },
          },
        }}
      />
    </div>
  );
}
