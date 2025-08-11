import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const ssl = {
  ca: process.env.EDM_DB_CA,
  cert: process.env.EDM_DB_CERT,
  key: process.env.EDM_DB_KEY,
};

console.log("engineeringDbHost", process.env.engineeringDbHost);
console.log("engineeringDbUser", process.env.engineeringDbUser);
console.log("engineeringDbPassword", process.env.engineeringDbPassword);
console.log("engineeringDbDatabase", process.env.engineeringDbDatabase);

const pool = mysql.createPool({
  host: process.env.engineeringDbHost,
  user: process.env.engineeringDbUser,
  password: process.env.engineeringDbPassword,
  database: process.env.engineeringDbDatabase?.toString(),
  port: Number(process.env.DBPort),
  // ssl,
  connectionLimit: 5,
});

async function queryNow() {
  try {
    const [rows] = await pool.query("SELECT NOW() AS now");
    console.log("Current time from DB:", rows);
  } catch (err) {
    console.error("DB connection error:", err);
  }
}

queryNow();
