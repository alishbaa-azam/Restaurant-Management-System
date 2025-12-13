import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100
      
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Invalid email']
    },
    phone: {
      type: String,
      required: true,
      trim: true
    },
    date: {
      type: String,
      required: true
    },
    time: {
      type: String,
      required: true
    },
    guests: {
      type: Number,
      required: true,
      min: 1,
      max: 20
    },
    tableType: {
      type: String,
      enum: ['indoor', 'outdoor', 'private', 'chef'],
      default: 'indoor'
    },
    specialRequests: {
      type: String,
      trim: true
    }
  },
  { timestamps: true }
);

export default mongoose.model('Booking', bookingSchema);
