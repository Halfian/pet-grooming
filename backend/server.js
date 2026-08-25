import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { authRoutes } from "./routes/authRoutes.js";
import { bookingRoutes } from "./routes/bookingRoutes.js";
import { servicesRoutes } from "./routes/servicesRoutes.js";
import { usersRoutes } from "./routes/usersRoutes.js";
import { petsRoutes } from "./routes/petsRoutes.js";

dotenv.config();

const app = express();
app.use(cors({
  origin: ["https://halfian.github.io", "http://localhost:5173"], // GitHub Pages domain and local dev server
  credentials: true
}));
app.use(express.json());

// Public routes
app.use("/api/auth", authRoutes);
app.use("/api/services", servicesRoutes);

// Protected routes
app.use("/api/bookings", bookingRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/pets", petsRoutes);

app.get("/api", (req, res) => res.json({ status: "Backend is online!" }));

// Development listening
app.listen(5000, () => console.log("Server running on port 5000"));

export default app;