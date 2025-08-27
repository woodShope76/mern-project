import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  fullName: String,
  phone: String,
  street: String,
  landmark: String,
  address: String,
  city: String,
  state: String,
  pincode: String,
}, { timestamps: true });

export default mongoose.model("Address", addressSchema);
