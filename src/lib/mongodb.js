import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

// Check for missing env variable
if (!MONGODB_URI) {
  throw new Error("⚠️ Please define the MONGODB_URI environment variable inside .env.local");
}

/**
 * Global is used here to maintain a cached connection across hot reloads in development.
 * This prevents creating multiple connections in dev mode.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
      console.log("✅ MongoDB Connected");
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
