import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import formidable from "formidable";
import path from "path";
import uploadToCloudinary from "@/lib/cloudinary";

export const config = {
  api: {
    bodyParser: false, // we use formidable
  },
};

const parseForm = (req) =>
  new Promise((resolve, reject) => {
    const form = formidable({ multiples: false, uploadDir: "./tmp", keepExtensions: true });

    form.on("fileBegin", (name, file) => {
      file.filepath = path.join(process.cwd(), "tmp", file.originalFilename);
    });

    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    try {
      const { fields, files } = await parseForm(req);

      // 1️⃣ Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(fields.password, salt);

      // 2️⃣ Upload profile photo (mock Cloudinary)
      let profileUrl = null;
      if (files.profilePhoto) {
        profileUrl = await uploadToCloudinary(files.profilePhoto);
      }

      // 3️⃣ Save user to DB
      const newUser = new User({
        name: fields.name,
        email: fields.email,
        password: hashedPassword, // store hashed password
        instagram: fields.instagram,
        gender: fields.gender,
        language: fields.language,
        location: fields.location,
        favFood: fields.favFood,
        weekendPlan: fields.weekendPlan,
        petLover: fields.petLover,
        profilePhoto: profileUrl,
      });

      await newUser.save();

      res.status(200).json({ success: true, message: "User signed up successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Error signing up user" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
