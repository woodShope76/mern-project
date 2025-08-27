import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false, // Optional for email/password login, required for Google
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: false, // ✅ Not required for Google users
  },
  image: {
    type: String, // ✅ Used to store profile picture (Cloudinary or Google photo)
    default: "",
  },
  authProvider: {
    type: String,
    enum: ["local", "google"],
    default: "local", // ✅ Set to "google" for Google logins
  },
}, {
  timestamps: true, // ✅ Optional: adds createdAt, updatedAt
});

const newUser = mongoose.model("user", userSchema);

export default newUser;
