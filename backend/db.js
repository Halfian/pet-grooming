import pkg from "pg";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const { Pool } = pkg;

const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: String(process.env.PGPASSWORD), // force to string
    port: process.env.PGPORT,
    ssl: process.env.NODE_ENV === "production"
        ? { rejectUnauthorized: false } // Neon requires SSL
        : false, // local dev disables SSL
});

export default pool;