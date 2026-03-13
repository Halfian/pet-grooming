import express from "express";
import pool from "../db.js";
import { authMiddleware } from "../authMiddleware.js";

const router = express.Router();

// Protect pets routes
router.use(authMiddleware);

router.get("/", authMiddleware, async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM pets WHERE owner_id = $1", [req.user.id]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Add a new pet
router.post("/", authMiddleware, async (req, res) => {
  const { name, type, breed } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO pets(owner_id, name, type, breed) VALUES($1, $2, $3, $4) RETURNING *",
      [req.user.id, name, type, breed]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

export { router as petsRoutes };