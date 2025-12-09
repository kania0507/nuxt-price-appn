import { db } from "./db";

export function initDb() {
  db.run(`
    CREATE TABLE IF NOT EXISTS submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      productName TEXT NOT NULL,
      netAmount REAL NOT NULL,
      vatRate TEXT NOT NULL,
      taxAmount REAL NOT NULL,
      grossAmount REAL NOT NULL,
      ip TEXT,
      createdAt TEXT NOT NULL
    )
  `);
  console.log("Tabela submissions jest gotowa.");
}
