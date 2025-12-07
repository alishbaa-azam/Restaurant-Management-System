import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  quantity: { type: Number, default: 1 }
}, { timestamps: true });

export default mongoose.model("Cart", cartSchema);
