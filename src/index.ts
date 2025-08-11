import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const ssl = {
  ca: process.env.EDM_DB_CA,
  cert: process.env.EDM_DB_CERT,
  key: process.env.EDM_DB_KEY,
};

import mysql from 'mysql2/promise';

async function connectToDatabase() {
  const connection = await mysql.createConnection({
    host: process.env.engineeringDbHost,
    user: process.env.engineeringDbUser,
    password: process.env.engineeringDbPassword,
    database: process.env.engineeringDbDatabase?.toString(),
    port: Number(process.env.DBPort),
    ssl
  });

  const [rows] = await connection.execute('SELECT NOW() AS time');
  console.log('Connected! Server time:', rows);
  await connection.end();
}

connectToDatabase().catch(err => {
  console.error('Connection failed:', err);
});




