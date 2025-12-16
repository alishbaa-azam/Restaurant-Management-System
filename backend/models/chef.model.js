import mongoose from "mongoose";

const chefSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String }, // Will store uploaded file path
});

export default mongoose.model("Chef", chefSchema);
