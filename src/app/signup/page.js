"use client"
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profilePhoto: null,
    instagram: "",
    gender: "",
    language: "",
    location: "",
    favFood: "",
    weekendPlan: "",
    petLover: "",
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-200 via-red-200 to-yellow-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg space-y-5"
      >
        <h2 className="text-3xl font-bold text-center text-pink-600">
          💘 Find Your Perfect VITmate 💘
        </h2>
        <p className="text-center text-gray-500">
          We only allow lovebirds from VIT Chennai 🏫✨  
          (Don’t worry, your location is just for verification — no stalking 🤞)
        </p>

        {/* Inputs */}
        <input
          type="text"
          name="name"
          placeholder="Your Name 😎"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg"
        />
        <input
          type="email"
          name="email"
          placeholder="Email 📧"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg"
        />
        <input
          type="file"
          name="profilePhoto"
          accept="image/*"
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg"
        />
        <input
          type="text"
          name="instagram"
          placeholder="Instagram Handle 📸"
          value={formData.instagram}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
        />

        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg"
        >
          <option value="">Preferred Gender 💕</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="any">Surprise me 😉</option>
        </select>

        <select
          name="language"
          value={formData.language}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
        >
          <option value="">Preferred Language 🗣️</option>
          <option value="english">English</option>
          <option value="tamil">Tamil</option>
          <option value="hindi">Hindi</option>
        </select>

        <input
          type="text"
          name="location"
          placeholder="Your Location 📍"
          value={formData.location}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg"
        />

        {/* Fun questions */}
        <input
          type="text"
          name="favFood"
          placeholder="Fav Food 🍕🍔"
          value={formData.favFood}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
        />
        <input
          type="text"
          name="weekendPlan"
          placeholder="Weekend Plan 🏖️🍿"
          value={formData.weekendPlan}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
        />

        <select
          name="petLover"
          value={formData.petLover}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
        >
          <option value="">Do you love pets? 🐶🐱</option>
          <option value="yes">Yes, they’re my babies ❤️</option>
          <option value="no">Nope, not really 🙃</option>
        </select>

        <button
          type="submit"
          className="w-full bg-pink-500 text-white p-3 rounded-lg hover:bg-pink-600 transition"
        >
          🚀 Sign Me Up
        </button>
      </form>

      {/* Toast container with pink theme */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#ec4899",
            color: "#fff",
            borderRadius: "12px",
            fontWeight: "bold",
          },
          success: {
            iconTheme: {
              primary: "#fff",
              secondary: "#ec4899",
            },
          },
        }}
      />
    </div>
  );
}
