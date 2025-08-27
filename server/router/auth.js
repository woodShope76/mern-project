import { Router } from "express";
import dbConnect from "../db/dbConnect.js";
import newUser from "../model/user.schema.js";
import Product from "../model/product.schema.js";
import bcrypt from "bcrypt";
import data from "../utils/data.js";
import multer from "multer";
import { storage } from "../utils/cloudinaryConfig.js";

const router = Router();
dbConnect();

// 🔐 Signup
// router.post("/signup", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Check if email or password is missing
//     if (!email || !password) {
//       return res.status(400).json({ message: "Email and password are required" });
//     }

//     // Check if user already exists
//     const existingUser = await newUser.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create and save user
//     const createdUser = new newUser({ email, password: hashedPassword });
//     await createdUser.save();

//     // Set cookie (✅ fixed user._id to createdUser._id)
//     res.cookie("userId", createdUser._id.toString(), {
//       httpOnly: true,
//       maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
//     });

//     // Return success
//     res.status(201).json({
//       message: "Signup successful",
//       user: {
//         _id: createdUser._id,
//         email: createdUser.email,
//       },
//     });

//   } catch (error) {
//     console.error("Signup error:", error); // log actual error
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // 🔐 Login
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Validate input
//     if (!email || !password) {
//       return res.status(400).json({ message: "Email and password are required" });
//     }

//     // Find user by email
//     const user = await newUser.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     // Compare password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     // Set cookie (✅ fixed: consistent naming)
//     res.cookie("userId", user._id.toString(), {
//       httpOnly: true,
//       maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
//     });

//     // Return success
//     res.status(200).json({
//       message: "Login successful",
//       user: {
//         _id: user._id,
//         email: user.email,
//       },
//     });

//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });
// // 🔒 Logout
// router.get("/logout", (req, res) => {
//   res.clearCookie("userId");
//   res.status(200).json({ message: "Logged out successfully" });
// });

// 🖼️ Upload Profile Image
const upload = multer({ storage });

router.post("/upload", upload.single("image"), (req, res) => {
  try {
    return res.status(200).json({
      message: "Upload successful",
      imageUrl: req.file.path,
    });
  } catch (err) {
    return res.status(500).json({ message: "Upload failed", error: err });
  }
});

// 🔄 Save Image URL to User
router.post("/save-profile-image", async (req, res) => {
  const { userId, imageUrl } = req.body;

  try {
    const updatedUser = await newUser.findByIdAndUpdate(
      userId,
      { image: imageUrl },
      { new: true }
    );
    res.json({ success: true, user: updatedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: "Image save failed" });
  }
});

// 📥 Insert Default Product Data
router.get("/insert-defaults", async (req, res) => {
  try {
    const existing = await Product.find();
    if (existing.length > 0) {
      return res.status(400).json({ message: "Products already exist." });
    }

    const result = await Product.insertMany(data, { ordered: false });
    res.status(200).json({ message: `Inserted ${result.length} products.` });
  } catch (err) {
    res.status(500).json({ message: "Failed to insert", error: err.message });
  }
});

// 📦 Fetch All Products
router.get("/", async (req, res) => {
  try {
    const allProducts = await Product.find();
    res.status(200).json(allProducts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
