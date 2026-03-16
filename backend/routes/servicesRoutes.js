import express from "express";
import pool from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM services");
    res.json(result.rows);
  } catch (err) {
    console.error("Error in /services route:", err.message);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

export { router as servicesRoutes };