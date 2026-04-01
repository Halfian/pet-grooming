import pkg from "pg";
import dotenv from "dotenv";

dotenv.config({ 
    path: process.env.NODE_ENV === "production"
    ? "./.env.production"
    : "./.env.development" });

const { Pool } = pkg;

const pool = process.env.NODE_ENV === "production"
? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }, // Neon requires SSL
})
: new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: String(process.env.PGPASSWORD), // force to string
    port: process.env.PGPORT,
    ssl: false,
});

export default pool;