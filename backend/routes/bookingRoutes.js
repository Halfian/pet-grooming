import express from "express";
import pool from "../db.js";
import { authMiddleware, isAdmin } from "../authMiddleware.js";

const router = express.Router();

router.use(authMiddleware); // Protect all booking routes with authentication

// Customer --- Create booking
router.post("/", async (req, res) => {
  const { pet_id, service_id, date } = req.body;
  const user_id = req.user.id; // Comes from JWT

  try {
    const result = await pool.query(
      "INSERT INTO bookings(user_id, pet_id, service_id, date, status) VALUES($1, $2, $3, $4, 'pending') RETURNING *",
      [user_id, pet_id, service_id, date]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Booking insert error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Customer --- Get bookings for logged-in user
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT b.id, b.date, b.status, p.name AS pet_name, s.name AS service_name, s.price
       FROM bookings b
       INNER JOIN pets p ON b.pet_id = p.id
       INNER JOIN services s ON b.service_id = s.id
       WHERE b.user_id = $1
       ORDER BY b.date ASC`,
      [req.user.id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Admin-only --- Get bookings with filters/pagination
router.get("/admin", isAdmin, async (req, res) => {
  const { status, page = 1, limit = 10, sort = "date", order = "asc" } = req.query;
  const validStatuses = ["pending", "completed", "canceled"];
  const validOrders = ["asc", "desc"];
  const sortMap = {
    date: "b.date",
    user_name: "u.name",
    pet_name: "p.name",
    service_name: "s.name"
  };

  const pageNum = parseInt(page, 10) || 1;
  const limitNum = parseInt(limit, 10) || 10;
  const offset = (pageNum - 1) * limitNum;

  try {
    let query = `
      SELECT 
        b.id, b.date, b.status, 
        u.name AS customer_name, u.phone, 
        p.name AS pet_name, p.type AS pet_type, p.breed AS pet_breed, 
        s.name AS service_name, s.description AS service_description, s.price AS service_price
      FROM bookings AS b
      INNER JOIN users AS u ON b.user_id = u.id
      INNER JOIN pets AS p ON b.pet_id = p.id
      INNER JOIN services AS s ON b.service_id = s.id
    `;
    let params = [];

    if (status && validStatuses.includes(status)) {
      query += ` WHERE b.status = $1`;
      params.push(status);
    }

    const sortField = sortMap[sort] || "b.date";
    const sortOrder = validOrders.includes(order.toLowerCase()) ? order : "asc";

    query += ` ORDER BY ${sortField} ${sortOrder} LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(limitNum, offset);

    const result = await pool.query(query, params);

    res.json({
      page: pageNum,
      limit: limitNum,
      count: result.rows.length,
      bookings: result.rows
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Admin-only --- Booking summary
router.get("/admin/summary", isAdmin, async (req, res) => {
  try {
    const statusResult = await pool.query(`
      SELECT status, COUNT(*) AS total
      FROM bookings
      GROUP BY status
    `);

    const revenueResult = await pool.query(`
      SELECT COALESCE(SUM(s.price), 0) AS total_revenue
      FROM bookings b
      INNER JOIN services s ON b.service_id = s.id
      WHERE b.status = 'completed'
    `);

    res.json({
      statusCounts: statusResult.rows,
      totalRevenue: revenueResult.rows[0].total_revenue
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Admin-only --- Get bookings by user
router.get("/admin/:user_id", isAdmin, async (req, res) => {
  const { user_id } = req.params;
  try {
    const result = await pool.query(`
      SELECT
        b.id, b.date, b.status, u.name AS customer_name, u.phone, 
        p.name AS pet_name, p.type AS pet_type, p.breed AS pet_breed, 
        s.name AS service_name, s.description AS service_description, s.price AS service_price
      FROM bookings AS b
      INNER JOIN users AS u ON b.user_id = u.id
      INNER JOIN pets AS p ON b.pet_id = p.id
      INNER JOIN services AS s ON b.service_id = s.id
      WHERE b.user_id = $1
      ORDER BY b.date ASC
    `, [user_id]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Admin-only --- Delete booking
router.delete("/admin/:id", isAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM bookings WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json({ message: "Booking deleted successfully", booking: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Admin-only --- Update booking status
router.put("/admin/:id", isAdmin, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const validStatuses = ["pending", "completed", "canceled"];

  if (!validStatuses.includes(status)) {
    return res.status(400).json({
      message: "Invalid status value. Allowed values: pending, completed, canceled"
    });
  }

  try {
    await pool.query("UPDATE bookings SET status = $1 WHERE id = $2", [status, id]);
    const result = await pool.query(`
      SELECT b.id, b.date, b.status, u.name AS customer_name, u.phone, 
             p.name AS pet_name, p.type AS pet_type, p.breed AS pet_breed, 
             s.name AS service_name, s.description AS service_description, s.price AS service_price
      FROM bookings AS b
      INNER JOIN users AS u ON b.user_id = u.id
      INNER JOIN pets AS p ON b.pet_id = p.id
      INNER JOIN services AS s ON b.service_id = s.id
      WHERE b.id = $1
    `, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json({ message: "Booking updated successfully", booking: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

export { router as bookingRoutes };