import { db } from "../../lib/database";
import { useTransactionsStore } from "../../stores/transactions";
import { Transaction } from "../../types";
import { DatabaseService } from "../DatabaseService";

describe("DatabaseService", () => {
  it("should insert initial balance correctly", async () => {
    const addTransaction = jest.fn();
    jest.spyOn(useTransactionsStore, "getState").mockReturnValue({
      addTransaction,
      transactions: [],
      setTransactions: jest.fn(),
    });
    jest.spyOn(db, "transaction").mockImplementation((callback) => {
      callback({
        executeSql: jest.fn().mockImplementation((sql, params, callback) => {
          callback({}, { insertId: 1 });
        }),
      });
    });
    const service = new DatabaseService();
    service.setInitialBalance(100);

    expect(db.transaction).toHaveBeenCalled();
    // Validate that the correct SQL was executed
    // @ts-expect-error
    expect(db.transaction.mock.calls[0][0]).toBeInstanceOf(Function);
    // Check if the transaction store's addTransaction was called with correct parameters
    expect(useTransactionsStore.getState().addTransaction).toHaveBeenCalledWith(
      {
        id: expect.any(Number), // or 1 if you want to be specific
        amount: 100,
        name: "Initial balance",
        description: null,
        type: "initial",
        createdAt: expect.any(Date),
      },
    );
  });

  it("should insert a transaction correctly", async () => {
    const addTransaction = jest.fn();
    jest.spyOn(useTransactionsStore, "getState").mockReturnValue({
      addTransaction,
      transactions: [],
      setTransactions: jest.fn(),
    });
    jest.spyOn(db, "transaction").mockImplementation((callback) => {
      callback({
        executeSql: jest
          .fn()
          .mockImplementation((sql, params, successCallback) => {
            successCallback({}, { insertId: 2 }); // Assuming the insertId for this transaction is 2
          }),
      });
    });

    const transaction: Transaction = {
      id: 2,
      amount: 50,
      name: "Grocery",
      description: "Weekly groceries",
      createdAt: new Date(),
      type: "expense",
    };

    const service = new DatabaseService();
    service.insertTransaction(transaction);

    // Check if the database transaction was called
    expect(db.transaction).toHaveBeenCalled();
    // Validate that the transaction store's addTransaction was called with the correct parameters
    expect(addTransaction).toHaveBeenCalledWith({
      ...transaction,
      id: 2, // The mocked insertId
    });
  });

  it("should fetch transactions correctly", async () => {
    const setTransactions = jest.fn();
    const mockTransactions = [
      {
        id: 1,
        amount: 100,
        name: "Initial balance",
        description: null,
        type: "initial",
        createdAt: new Date().toISOString(),
      },
      {
        id: 2,
        amount: 50,
        name: "Grocery",
        description: "Weekly groceries",
        type: "expense",
        createdAt: new Date().toISOString(),
      },
    ];

    jest.spyOn(useTransactionsStore, "getState").mockReturnValue({
      addTransaction: jest.fn(),
      transactions: [],
      setTransactions,
    });
    jest.spyOn(db, "transaction").mockImplementation((callback) => {
      callback({
        executeSql: jest
          .fn()
          .mockImplementation((sql, params, successCallback) => {
            successCallback({}, { rows: { _array: mockTransactions } });
          }),
      });
    });

    const service = new DatabaseService();
    service.fetchTransactions();

    // Check if the database transaction was called
    expect(db.transaction).toHaveBeenCalled();
    // Validate that the transaction store's setTransactions was called with the correct parameters
    expect(setTransactions).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          id: 1,
          amount: 100,
          name: "Initial balance",
          type: "initial",
        }),
        expect.objectContaining({
          id: 2,
          amount: 50,
          name: "Grocery",
          type: "expense",
        }),
      ]),
    );
  });
});
