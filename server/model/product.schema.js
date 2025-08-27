import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  size: { type: String, required: true }, // ✅ Added to match your JSON
  category: { type: String, required: true },
  price: { type: Number, required: true }, // ✅ Number as per your JSON
  image: { type: String, required: true },
  description: { type: String, required: true }, // ✅ Added to match your JSON
  stock: { type: Boolean, default: true } // ✅ Already correct
});

export default mongoose.model("Product", ProductSchema);
