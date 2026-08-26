import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

// Check if connection string exist where Vercel will look for it in the environment variables
const isProduction = process.env.DATABASE_URL ? true : false;

const pool = isProduction
? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }, // Neon requires SSL also keeps connection secure for cloud hosts
})
: new Pool({
    // Local database configuration fallback
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: String(process.env.PGPASSWORD), // force to string
    port: process.env.PGPORT,
    ssl: false,
});

export default pool;