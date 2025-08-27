import express from "express";
import Address from "../model/Address.js";

const router = express.Router();

router.post("/save", async (req, res) => {
  const { userId, fullName, phone, street, landmark, address, city, state, pincode } = req.body;

  try {
    const newAddress = new Address({
      userId, fullName, phone, street, landmark, address, city, state, pincode,
    });
    await newAddress.save();
    res.status(201).json({ message: "Address saved successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to save address." });
  }
});


// ✅ Fix this route to correctly fetch from Address, not Cart
router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const addresses = await Address.find({ userId }); // ✅ Returns array of all saved addresses
    if (!addresses || addresses.length === 0) {
      return res.status(200).json([]); // Return empty array if none found
    }

    res.json(addresses); // ✅ Return array of addresses
  } catch (error) {
    console.error("🔥 Error in address GET route:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});



export default router;
