import mongoose from "mongoose";

const CulinarySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    desc: { type: String, required: true },
    iconType: { type: String, required: true }, // truck / chef / leaf
    img: { type: String }, // saved image URL
  },
  { timestamps: true }
);

export default mongoose.model("Culinary", CulinarySchema);
