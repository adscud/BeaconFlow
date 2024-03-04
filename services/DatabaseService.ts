import { db } from "../lib/database";
import { useSettingsStore } from "../stores/settings";
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
          name TEXT NOT NULL,
          description TEXT,
          createdAt TEXT NOT NULL,
          type TEXT NOT NULL CHECK (type IN ('income', 'expense', 'initial'))
        );`,
        [],
        () => {},
        (_, error) => {
          console.error("Error creating transactions table", error);
          return true;
        },
      );

      // Create settings table
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS settings (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          ready BOOLEAN NOT NULL,
          current_balance REAL NOT NULL,
          salary REAL NOT NULL,
          currency TEXT NOT NULL,
          language TEXT NOT NULL
        );`,
        [],
        (_, { rows }) => {
          tx.executeSql("SELECT * FROM settings LIMIT 1", [], (_, { rows }) => {
            if (rows.length === 0) {
              tx.executeSql(
                `INSERT INTO settings (ready, current_balance, salary, currency, language) VALUES (?, ?, ?, ?, ?);`,
                [false, 0, 0, "EUR", "fr"],
                () => console.log("Settings created"),
                (_, error) => {
                  console.error("Error creating settings", error);
                  return true;
                },
              );
            }
          });
        },
        (_, error) => {
          console.error("Error creating settings table", error);
          return true;
        },
      );

      // Create recurrentExpenses table
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS recurrentExpenses (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          amount REAL NOT NULL,
          description TEXT NOT NULL,
          frequency TEXT NOT NULL
        );`,
        [],
        () => {},
        (_, error) => {
          console.error("Error creating recurrentExpenses table", error);
          return true;
        },
      );
    });
  }

  updateSalary(salary: number) {
    const { settings } = useSettingsStore.getState();
    if (!settings) return;

    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE settings SET salary = ? WHERE id = ?;`,
        [salary, settings.id],
        () => {
          const { setSettings } = useSettingsStore.getState();
          setSettings({
            ...settings,
            salary,
          });
        },
        (_, error) => {
          console.error("Error updating salary", error);
          return true;
        },
      );
    });
  }

  drop() {
    db.transaction((tx) => {
      tx.executeSql(
        `DROP TABLE transactions;`,
        [],
        () => console.log("Table dropped"),
        (_, error) => {
          console.error("Error dropping table", error);
          return true;
        },
      );
    });
  }

  setInitialBalance(amount: number) {
    db.transaction((tx) => {
      const createdAt = new Date().toISOString();
      tx.executeSql(
        `INSERT INTO transactions (amount, name, type, createdAt) VALUES (?, ?, ?, ?);`,
        [amount, "Initial balance", "initial", createdAt],
        (_, { insertId }) => {
          const { addTransaction } = useTransactionsStore.getState();
          addTransaction({
            id: insertId ?? Math.random(),
            amount,
            name: "Initial balance",
            description: null,
            type: "initial",
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
    const { amount, name, description, createdAt, type } = transaction;
    const createdAtISO = createdAt.toISOString();

    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO transactions (amount, name, description, type, createdAt) VALUES (?, ?, ?, ?, ?);`,
        [amount, name, description, type, createdAtISO],
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
