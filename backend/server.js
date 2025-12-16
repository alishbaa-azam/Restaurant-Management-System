import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import bcrypt from 'bcryptjs';
import User from './models/user.model.js';

// Routes
import bookingRoutes from "./routes/booking.routes.js";
import chefRoutes from "./routes/chef.routes.js";
import culinaryRoutes from "./routes/culinary.js";
import statsRoutes from "./routes/stats.js";
import menuRoutes from "./routes/menu.routes.js";
import cartRoutes from "./routes/cartRoutes.js"; 
import paymentRoutes from "./routes/payment.routes.js";
import authRoutes from "./routes/auth.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import customerRoutes from "./routes/customer.routes.js";
// import chefRoutes from "./routes/chef.routes.js";
dotenv.config();
// Add after dotenv.config()
console.log('Environment check:');
console.log('- NODE_ENV:', process.env.NODE_ENV);
console.log('- Database connected:', !!process.env.MONGODB_URI);
console.log('- Email configured:', !!(process.env.EMAIL_HOST && process.env.EMAIL_USER));

const app = express();
const PORT = process.env.PORT || 5000;

// DB Connect
connectDB();

// Seed demo users in non-production (safe: will check existence first)
const seedDemoUsers = async () => {
  try {
    // create admin if none exists
    const adminExists = await User.findOne({ role: 'admin' });
    if (!adminExists) {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash('demo1234', salt);
      await User.create({ name: 'Demo Admin', email: 'admin@example.com', password: hashed, role: 'admin' });
      console.log('Demo admin created: admin@example.com / demo1234');
    }

    // create demo customer if none exists
    const custExists = await User.findOne({ email: 'customer@example.com' });
    if (!custExists) {
      const salt2 = await bcrypt.genSalt(10);
      const hashed2 = await bcrypt.hash('demo1234', salt2);
      await User.create({ name: 'Demo Customer', email: 'customer@example.com', password: hashed2, role: 'customer' });
      console.log('Demo customer created: customer@example.com / demo1234');
    }
  } catch (err) {
    console.error('Seeding demo users failed', err);
  }
};

// Run seeding only in development/test to avoid unexpected DB changes in production
if (process.env.NODE_ENV !== 'production') {
  // run after a short delay to ensure DB connection is ready
  setTimeout(() => { seedDemoUsers(); }, 1000);
}

// Middleware
app.use(cors());
app.use(express.json());

// Static Uploads
app.use("/uploads", express.static("uploads"));

// API Routes
app.use("/api/bookings", bookingRoutes);
app.use("/api/chef", chefRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/cart", cartRoutes); 
app.use("/api/payment", paymentRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/customer', customerRoutes);
app.use('/api/culinary', culinaryRoutes);
app.use('/api/stats', statsRoutes);
app.use("/api/chefs", chefRoutes);
// Error handlers (not found + general)
import { notFound, errorHandler } from './middleware/errorHandler.js';

app.use(notFound);
app.use(errorHandler);

// Base route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

