import { openDatabase, SQLiteDatabase } from "expo-sqlite";

import { Transaction } from "../types";

export class DatabaseService {
  static shared = new DatabaseService();

  private readonly db: SQLiteDatabase;

  constructor() {
    this.db = openDatabase("BeaconFlow.db");

    this.db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS transactions (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          amount REAL NOT NULL,
          description TEXT NOT NULL,
          createdAt TEXT NOT NULL
        );`,
        [],
        () => console.log("Table created"),
        (_, error) => {
          console.error("Error creating table", error);
          return true;
        },
      );
    });
  }

  insertTransaction(transaction: Transaction) {
    // Convert Date to ISO string for storage
    const { amount, description, createdAt } = transaction;
    const createdAtISO = createdAt.toISOString();

    this.db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO transactions (amount, description, createdAt) VALUES (?, ?, ?);`,
        [amount, description, createdAtISO],
        () => {
          console.log("Transaction inserted", transaction);
        },
        (_, error) => {
          console.log("DB error insert transaction", error);
          return true;
        },
      );
    });
  }
}
