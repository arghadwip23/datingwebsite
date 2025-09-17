import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // 🔑 Hashed
    profilePhoto: { type: String }, // Cloudinary URL
    instagram: { type: String },
    gender: { type: String },
    location: { type: String },

    // 🆕 New fields
    relationshipGoal: { type: String, enum: ["casual", "longTerm", "friendship"], default: "friendship" },
    lifestyle: { type: String }, // e.g. balanced, workaholic, chill
    weekendVibe: { type: String }, // e.g. explorer, movieBuff
    schedule: { type: String }, // morningPerson, nightOwl
    activityLevel: { type: String }, // active, moderatelyActive, chill
    loveLanguage: { type: String }, // qualityTime, wordsOfAffirmation, etc.
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
