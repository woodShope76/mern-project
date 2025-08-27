import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    cartItems: [
      {
        _id: String,              // Product ID
        title: String,            // Product title
        image: String,            // ✅ New field: image URL
        price: Number,
        quantity: Number,
      },
    ],
    shippingInfo: {
      fullName: String,
      phone: String,
      street: String,
      landmark: String,
      address: String,
      city: String,
      state: String,
      pincode: String,
    },
    total: Number,
    paymentMethod: String,
    status: { type: String, default: "Processing" },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

export default mongoose.model("Order", orderSchema);
