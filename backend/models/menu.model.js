import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  description: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true,
    min: 1
  },

  category: {
    type: String,
    required: true,
    enum: [
      "BREAKFAST",
      "LUNCH",
      "DINNER",
      "APPETIZERS",
      "DESSERTS",
      "DRINKS",
      "SPECIALS"
    ]
  },

  image: {
    type: String,
    required: true
  }
});

export default mongoose.model("MenuItem", menuSchema);
