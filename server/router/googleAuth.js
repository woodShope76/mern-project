import express from "express";
import User from "../model/user.schema.js";

const router = express.Router();

router.post("/firebase-login", async (req, res) => {
  const { name, email, picture } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ name, email, image: picture });
      await user.save();
    }

    // Set cookie
<<<<<<< HEAD
  res.cookie("userId", user._id.toString(), {
=======
   res.cookie("userId", user._id.toString(), {
>>>>>>> f96047a57d15f551848f47cc9d746bb9d9183245
  httpOnly: true,
  secure: true,              // ✅ required for HTTPS (Render, Vercel, etc.)
  sameSite: "None",          // ✅ required for cross-origin cookies
  maxAge: 7 * 24 * 60 * 60 * 1000,
});
<<<<<<< HEAD

=======
>>>>>>> f96047a57d15f551848f47cc9d746bb9d9183245

    res.status(200).json(user);
  } catch (error) {
    console.error("Firebase login failed:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ✅ Add this route for admin to get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find(); // fetch all users
    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});


// DELETE user by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


export default router;
