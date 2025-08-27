import express from "express";
import Order from "../model/Order.schema.js"

const router = express.Router();

router.post("/create-order", async (req, res) => {
  const { userId, cartItems, shippingInfo, total, paymentMethod, status, createdAt } = req.body;

  try {
    const newOrder = new Order({
      userId, // ✅ Firebase UID now
      cartItems,
      shippingInfo,
      total,
      paymentMethod,
      status,
      createdAt,
    });

    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to place order." });
  }
});


// Add this at the top of your routes/orderRoutes.js
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error("❌ Error fetching all orders:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});


// backend route
// 🔧 This route must match frontend GET /api/orders/:uid
router.get("/:uid", async (req, res) => {
  const userId = req.params.uid;

  try {
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

// ✅ PUT: Update order status by ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(updatedOrder);
  } catch (err) {
    console.error("❌ Order update error:", err);
    res.status(500).json({ message: "Failed to update order", error: err.message });
  }
});



export default router;
