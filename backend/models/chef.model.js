import mongoose from "mongoose";

const chefSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      minlength: 10,
    },
    pic: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Chef", chefSchema);
