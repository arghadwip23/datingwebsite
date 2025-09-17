"use client";

import { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";

export default function ProfilePic({ src, editable = false, onUpload }) {
  const [preview, setPreview] = useState(src);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show preview instantly
    setPreview(URL.createObjectURL(file));

    if (onUpload) {
      await onUpload(file);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-3">
      <div className="relative w-32 h-32 rounded-full overflow-hidden border border-gray-300">
        {preview ? (
          <Image
            src={preview}
            alt="Profile"
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500">
            No Photo
          </div>
        )}
      </div>

      {editable && (
        <label className="cursor-pointer text-sm text-gray-700 bg-gray-100 px-3 py-1 rounded-md hover:bg-gray-200">
          Change Photo
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      )}
    </div>
  );
}
