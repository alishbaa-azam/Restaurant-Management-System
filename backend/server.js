import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import connectDB from "./config/db.js";
import bookingRoutes from "./routes/booking.routes.js"
import chefRoutes from "./routes/chef.routes.js"
import menuRoutes from "./routes/menu.routes.js"


dotenv.config();

const app = express()
connectDB();
app.use(cors());
app.use(express.json());
app.use("/api/booking", bookingRoutes);
app.use("/api/chef", chefRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/menu", menuRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));