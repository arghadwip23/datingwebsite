"use client";

import { useState } from "react";
import { Pencil, X, Check } from "lucide-react";
import toast from "react-hot-toast";

export default function ProfilePreferences({ preferences }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(preferences || {});

  const fields = [
    { name: "gender", label: "Gender", options: ["male", "female", "any"] },
    { name: "relationshipGoal", label: "Relationship Goal", options: ["longTerm", "casual"] },
    { name: "lifestyle", label: "Lifestyle", options: ["social", "balanced", "lowKey"] },
    { name: "weekendVibe", label: "Weekend Vibe", options: ["outdoorsy", "homebody", "explorer", "productive"] },
    { name: "schedule", label: "Schedule", options: ["earlyBird", "nightOwl", "flexible"] },
    { name: "activityLevel", label: "Activity Level", options: ["veryActive", "moderatelyActive", "notActive"] },
    { name: "loveLanguage", label: "Love Language", options: ["wordsOfAffirmation", "qualityTime", "actsOfService", "physicalTouch", "gifts"] },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    await toast.promise(
      (async () => {
        const res = await fetch("/api/profile", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (!res.ok) throw new Error("Failed to update profile");
        return res.json();
      })(),
      {
        loading: "Saving preferences...",
        success: "Preferences updated 🎉",
        error: "Update failed 😭",
      }
    );
    setIsEditing(false);
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Preferences</h3>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="text-gray-500 hover:text-gray-700"
          >
            <Pencil size={18} />
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="text-green-600 hover:text-green-800"
            >
              <Check size={20} />
            </button>
            <button
              onClick={() => {
                setFormData(preferences);
                setIsEditing(false);
              }}
              className="text-red-600 hover:text-red-800"
            >
              <X size={20} />
            </button>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {fields.map((field) => (
          <div key={field.name} className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              {field.label}
            </label>

            {isEditing ? (
              <select
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md text-sm text-gray-700"
              >
                <option value="">Select {field.label}</option>
                {field.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt.charAt(0).toUpperCase() + opt.slice(1)}
                  </option>
                ))}
              </select>
            ) : (
              <p className="text-sm text-gray-600">
                {preferences[field.name]
                  ? preferences[field.name].charAt(0).toUpperCase() +
                    preferences[field.name].slice(1)
                  : "Not set"}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
