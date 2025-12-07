import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

// Routes
import bookingRoutes from "./routes/booking.routes.js";
import chefRoutes from "./routes/chef.routes.js";
import menuRoutes from "./routes/menu.routes.js";
import cartRoutes from "./routes/cartRoutes.js"; 

dotenv.config();

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
app.use("/api/booking", bookingRoutes);
app.use("/api/chef", chefRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/cart", cartRoutes); // ⭐ Added cart route

// Base route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
