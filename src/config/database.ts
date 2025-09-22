import pkg from "pg";
import dotenv from "dotenv"
const { Pool } = pkg;

dotenv.config();
const pool = new Pool({
  user: String(process.env["PGUSER"]),
  host: String(process.env["PGHOST"]),
  database: String(process.env["PGDATABASE"]),
  password: String(process.env["PGPASSWORD"]),
  port: process.env["PGPORT"] ? parseInt(process.env["PGPORT"], 10) : 5432,
});

export default pool;
