import * as SQLite from 'expo-sqlite';

let dbInstance = null;

export const getDatabaseConnection = async () => {
  if (!dbInstance) {
    dbInstance = await SQLite.openDatabaseAsync('kasku.db');
  }
  return dbInstance;
};

export const initDatabase = async () => {
  const db = await getDatabaseConnection();
  
  try {

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await db.execAsync(`
      PRAGMA journal_mode = WAL;

      CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        type TEXT NOT NULL CHECK(type IN ('income', 'expense')),
        amount REAL NOT NULL CHECK(amount > 0),
        description TEXT NOT NULL CHECK(length(trim(description)) > 0),
        transaction_date TEXT NOT NULL,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
      );
    `);
    console.log("Database & Tabel transactions berhasil diinisialisasi.");
  } catch (error) {
    console.error("Gagal menginisialisasi database:", error);
    throw error;
  }
};