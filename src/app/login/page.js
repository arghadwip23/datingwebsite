"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({
    id: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/login", form);
      if (res.status === 200) {
        toast.success("Login successful! Redirecting...");
        setTimeout(() => router.push("/profile/explore"), 1200);
      }
    } catch (err) {
      toast.error("Invalid ID or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-pink-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl p-8 w-full max-w-sm flex flex-col gap-6"
      >
        <h2 className="text-2xl font-bold text-center text-pink-600">Login</h2>
        <input
          type="text"
          name="id"
          placeholder="ID"
          value={form.id}
          onChange={handleChange}
          required
          className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-pink-500 text-white p-3 rounded-lg hover:bg-pink-600 transition disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
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
