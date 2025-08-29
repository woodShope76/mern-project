import { configDotenv } from "dotenv";
configDotenv();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import newUser from "./model/user.schema.js";
import authRoutes from "./router/auth.js";
import productRoutes from "./router/productRoutes.js";
import googleAuthRoute from "./router/googleAuth.js";
import cartRoutes from "./router/cartRoutes.js"
import addressRoutes from "./router/address.js";
import orderRoutes from "./router/orders.js";
import userRoutes from "./router/googleAuth.js";


const app = express();
const port = process.env.PORT || 5000;

// ✅ CORS setup for dev + prod
app.use(cors({
  origin: [
  
    "https://mern-project-frontend-2.onrender.com"  // 🔁 Replace when deployed
  ],
  credentials: true,
}));

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ Routes
app.use("/api/auth", googleAuthRoute);  // For Google login
app.use("/api", authRoutes);            // For signup, login, profile, upload
app.use("/api/products", productRoutes);    // For products
app.use("/api/cart", cartRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes); // ✅ Important!

// ✅ Profile Route (moved inside /api, but kept here for clarity)
app.get("/api/profile", async (req, res) => {
  try {
    const userId = req.cookies.userId;
    if (!userId) return res.status(401).json({ message: "Not logged in" });

    const user = await newUser.findById(userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ user });
  } catch (err) {
    console.error("Profile fetch error:", err);
    res.status(500).json({ message: "Server error" });
  }
});


// ✅ Start Server
app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});
