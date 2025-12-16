import mongoose from "mongoose";

const statsSchema = new mongoose.Schema({
  number: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  iconType: {
    type: String,
    enum: ["delivery", "heart", "leaf", "clock"],
    required: true,
  }
}, { timestamps: true });

export default mongoose.model("Stat", statsSchema);
