import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

// Routes
import bookingRoutes from "./routes/booking.routes.js";
import chefRoutes from "./routes/chef.routes.js";
import menuRoutes from "./routes/menu.routes.js";
import cartRoutes from "./routes/cartRoutes.js"; 
import paymentRoutes from "./routes/payment.routes.js";

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

// Base route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import helmet from 'helmet';
// import rateLimit from 'express-rate-limit';
// import compression from 'compression';
// import menuRoutes from "./routes/menu.routes.js";
// import connectDB from './config/db.js';
// import bookingRoutes from './routes/booking.routes.js';

// // Load environment variables
// dotenv.config();

// // Connect to MongoDB
// await connectDB();

// const app = express();

// // Security middleware
// app.use(helmet());

// // Rate limiting
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // limit each IP to 100 requests per windowMs
//   message: 'Too many requests from this IP, please try again later.'
// });
// app.use('/api', limiter);

// // Compression
// app.use(compression());

// // CORS
// app.use(cors({
//   origin: process.env.FRONTEND_URL || 'http://localhost:5173',
//   credentials: true
// }));

// // Body parser
// app.use("/uploads", express.static("uploads"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Routes
// app.use('/api/bookings', bookingRoutes);
// app.use("/api/menu", menuRoutes);
// // Health check
// app.get('/api/health', (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: 'Server is running',
//     timestamp: new Date().toISOString()
//   });
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({
//     success: false,
//     message: 'Something went wrong!',
//     error: process.env.NODE_ENV === 'development' ? err.message : undefined
//   });
// });

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
//   console.log(`📁 Environment: ${process.env.NODE_ENV}`);
//   console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL}`);
// });