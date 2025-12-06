import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: [/\S+@\S+\.\S+/, "Invalid email"],
    },
    contact: {
    type: String,
    required: [true, "Contact number is required"],
    match: [/^(03\d{9})$/, "Invalid contact number"]
  },
    persons: {
      type: Number,
      required: true,
      min: 1,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    specialRequest: {
      type: String,
      required: true,
    },
    tableNumber: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
