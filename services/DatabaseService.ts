import { db } from "../lib/database";
import { useTransactionsStore } from "../stores/transactions";
import { Transaction } from "../types";

export class DatabaseService {
  static shared = new DatabaseService();

  init() {
    db.transaction((tx) => {
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

  setInitialBalance(amount: number) {
    db.transaction((tx) => {
      const createdAt = new Date().toISOString();
      tx.executeSql(
        `INSERT INTO transactions (amount, description, createdAt) VALUES (?, ?, ?);`,
        [amount, "Initial balance", createdAt],
        (_, { insertId }) => {
          const { addTransaction } = useTransactionsStore.getState();
          addTransaction({
            id: insertId ?? Math.random(),
            amount,
            description: "Initial balance",
            createdAt: new Date(createdAt),
          });
        },
        (_, error) => {
          console.error("Error inserting initial balance", error);
          return true;
        },
      );
    });
  }

  insertTransaction(transaction: Transaction) {
    // Convert Date to ISO string for storage
    const { amount, description, createdAt } = transaction;
    const createdAtISO = createdAt.toISOString();

    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO transactions (amount, description, createdAt) VALUES (?, ?, ?);`,
        [amount, description, createdAtISO],
        () => {
          const { addTransaction } = useTransactionsStore.getState();
          addTransaction(transaction);
        },
        (_, error) => {
          console.log("DB error insert transaction", error);
          return true;
        },
      );
    });
  }

  fetchTransactions() {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM transactions;`,
        [],
        (_, { rows }) => {
          const transactions: Transaction[] = rows._array.map((row) => ({
            ...row,
            createdAt: new Date(row.createdAt), // Convert ISO string back to Date
          }));
          const { setTransactions } = useTransactionsStore.getState();
          setTransactions(transactions);
        },
        (_, error) => {
          console.log("DB error fetch transactions", error);
          const { setTransactions } = useTransactionsStore.getState();
          setTransactions([]);
          return true; // To stop propagation
        },
      );
    });
  }
}
