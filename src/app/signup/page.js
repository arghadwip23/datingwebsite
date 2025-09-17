"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Confirm password check
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match ❌");
      return;
    }

    // Location check
    if (!formData.location.toLowerCase().includes("vit chennai")) {
      toast.error("Sorry cutie 😭 Only lovebirds from VIT Chennai or nearby can join!");
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "confirmPassword") data.append(key, value);
    });

    setIsSubmitting(true);

    // Use toast.promise for better UX
    await toast.promise(
      (async () => {
        const res = await fetch("/api/signup", {
          method: "POST",
          body: data,
        });

        if (!res.ok) {
          const error = await res.json();
          throw new Error(error.message || "Signup failed 😭 Try again, superstar!");
        }

        return res.json();
      })(),
      {
        loading: "Creating your account...",
        success: "Yay! 🎉 You’re in. Let’s find your soulmate 💕",
        error: (err) => err.message,
      }
    );

    setIsSubmitting(false);
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-sm rounded-lg p-8 w-full max-w-4xl space-y-6"
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

        {/* Two-column layout on md+ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* name */}
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

          {/* email */}
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

          {/* password */}
          <div className="space-y-2 relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={8}
              className="w-full p-3 border border-gray-200 rounded-md text-sm text-gray-700 placeholder-gray-500 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            <span className="text-sm text-gray-500 pl-2">Must be at least 8 characters long</span>
          </div>

          {/* confirm password */}
          <div className="space-y-2 relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-200 rounded-md text-sm text-gray-700 placeholder-gray-500 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* profile photo */}
          <div className="space-y-2 md:col-span-2">
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

          {/* instagram */}
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

          {/* location */}
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

          {/* dropdowns */}
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-200 rounded-md text-sm text-gray-700"
          >
            <option value="">Select Gender Preference</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="any">No Preference</option>
          </select>

          <select
            name="relationshipGoal"
            value={formData.relationshipGoal}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-200 rounded-md text-sm text-gray-700"
          >
            <option value="">What are you looking for?</option>
            <option value="longTerm">Long-term relationship</option>
            <option value="casual">Something casual</option>
          </select>

          <select
            name="lifestyle"
            value={formData.lifestyle}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-200 rounded-md text-sm text-gray-700"
          >
            <option value="">Which best describes your lifestyle?</option>
            <option value="social">Social butterfly</option>
            <option value="balanced">Balanced</option>
            <option value="lowKey">Low-key</option>
          </select>

          <select
            name="weekendVibe"
            value={formData.weekendVibe}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-200 rounded-md text-sm text-gray-700"
          >
            <option value="">What&apos;s your weekend vibe?</option>
            <option value="outdoorsy">Outdoorsy/adventurous</option>
            <option value="homebody">Relaxing at home</option>
            <option value="explorer">Exploring food, culture, or nightlife</option>
            <option value="productive">Catching up on hobbies/work</option>
          </select>

          <select
            name="schedule"
            value={formData.schedule}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-200 rounded-md text-sm text-gray-700"
          >
            <option value="">Are you more of a...</option>
            <option value="earlyBird">Early bird</option>
            <option value="nightOwl">Night owl</option>
            <option value="flexible">Flexible / depends on the day</option>
          </select>

          <select
            name="activityLevel"
            value={formData.activityLevel}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-200 rounded-md text-sm text-gray-700"
          >
            <option value="">How active are you?</option>
            <option value="veryActive">Very active</option>
            <option value="moderatelyActive">Moderately active</option>
            <option value="notActive">Not active</option>
          </select>

          <select
            name="loveLanguage"
            value={formData.loveLanguage}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-200 rounded-md text-sm text-gray-700"
          >
            <option value="">What&apos;s your love language?</option>
            <option value="wordsOfAffirmation">Words of affirmation</option>
            <option value="qualityTime">Quality time</option>
            <option value="actsOfService">Acts of service</option>
            <option value="physicalTouch">Physical touch</option>
            <option value="gifts">Gifts</option>
          </select>
        </div>

        {/* submit button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full p-3 rounded-md text-sm font-medium transition-colors ${
            isSubmitting
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-black text-white hover:bg-gray-800"
          }`}
        >
          {isSubmitting ? "Creating Account..." : "Create Account"}
        </button>

        {/* Link to login */}
        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-black font-medium hover:underline">
            Log in
          </Link>
        </p>
      </form>

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#fff",
            color: "#000",
            borderRadius: "6px",
            fontSize: "14px",
          },
        }}
      />
    </div>
  );
}
