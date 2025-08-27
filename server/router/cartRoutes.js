import express from "express";
import Cart from "../model/cart.schema.js";
import mongoose from "mongoose";


const router = express.Router();

// Add to cart
router.post("/add-to-cart", async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (cart) {
      const index = cart.items.findIndex((item) =>
        item.productId.toString() === productId
      );

      if (index > -1) {
  cart.items[index].quantity += quantity;
     } else {
      cart.items.push({
       productId: new mongoose.Types.ObjectId(productId),
       quantity,
       });
     }
    } else {
      cart = new Cart({ userId, items: [{ productId, quantity }] });
    }

    await cart.save();
    res.status(200).json({ message: "Product added to cart", cart });

  } catch (error) {
    console.error("❌ Error in add-to-cart:", error);
    res.status(500).json({ message: "Failed to add to cart", error: error.message });
  }
});


// ✅ Fetch cart by userId
router.get("/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });

    if (!cart) {
      return res.status(200).json({ items: [] }); // Empty cart is okay
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});



// Get cart by userId
router.delete("/delete", async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const objectId = new mongoose.Types.ObjectId(productId);

    const updatedCart = await Cart.findOneAndUpdate(
      { userId },
      { $pull: { items: { productId: objectId } } },
      { new: true }
    );

    if (!updatedCart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json({ message: "Item removed", cart: updatedCart });
  } catch (err) {
    console.error("❌ Error deleting item:", err);
    res.status(500).json({ message: "Error removing item", error: err.message });
  }
});

// Clear entire cart for a user (by Firebase UID)
router.delete("/clear/:uid", async (req, res) => {
  const { uid } = req.params;

  try {
    const updatedCart = await Cart.findOneAndUpdate(
      { userId: uid }, // Match using Firebase UID
      { items: [] },   // Clear items
      { new: true }    // Return updated document
    );

    if (!updatedCart) {
      return res.status(404).json({ message: "Cart not found for this user" });
    }

    res.status(200).json({ message: "Cart cleared", cart: updatedCart });
  } catch (err) {
    console.error("❌ Error clearing cart:", err);
    res.status(500).json({ message: "Error clearing cart", error: err.message });
  }
});





export default router;
