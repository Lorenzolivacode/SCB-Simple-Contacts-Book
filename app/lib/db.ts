import Database from "better-sqlite3";
import path from "path";

// Inizializza il database SQLite e crea la tabella se non esiste
export const db = new Database(
  path.resolve(process.cwd(), "/app/lib/contacts.db")
);

db.prepare(
  `CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    favorite BOOLEAN DEFAULT 0
  )`
).run();

console.log("Database initialized and table checked/created");

export default db;
