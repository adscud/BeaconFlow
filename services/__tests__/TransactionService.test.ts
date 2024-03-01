import { Transaction } from "../../types";
import { TransactionService } from "../TransactionService";

describe("TransactionService", () => {
  const mockTransactions: Transaction[] = [
    {
      id: 1,
      amount: 100,
      name: "Salary",
      description: "Monthly salary",
      createdAt: new Date("2024-03-01"),
      type: "income",
    },
    {
      id: 2,
      amount: 50,
      name: "Grocery",
      description: "Weekly groceries",
      createdAt: new Date("2024-03-02"),
      type: "expense",
    },
    {
      id: 3,
      amount: 20,
      name: "Books",
      description: "Programming books",
      createdAt: new Date("2024-03-01"),
      type: "expense",
    },
  ];

  it("should group transactions by date correctly", () => {
    const service = new TransactionService();
    const grouped = service.groupByDate(mockTransactions);

    expect(Object.keys(grouped)).toHaveLength(2); // Expecting two groups
    expect(grouped["2024-03-01"]).toHaveLength(2);
    expect(grouped["2024-03-02"]).toHaveLength(1);
  });

  it("should flatten grouped transactions correctly", () => {
    const service = new TransactionService();
    // Assuming `groupByDate` works correctly, directly use its result here
    const grouped = service.groupByDate(mockTransactions);
    const flattened = service.flattenTransactions(grouped);

    expect(flattened).toHaveLength(5); // 2 dates + 3 transactions
    expect(typeof flattened[0]).toBe("string"); // First item should be a date
    expect(flattened[1]).toHaveProperty("id", 1); // First transaction of the first date
    expect(flattened[2]).toHaveProperty("id", 3); // Second transaction of the first date
    expect(flattened[3]).toBe("2024-03-02"); // Second date
    expect(flattened[4]).toHaveProperty("id", 2); // First transaction of the second date
  });

  it("should group and flatten transactions correctly", () => {
    const service = new TransactionService();
    const groupedAndFlattened = service.group(mockTransactions);

    expect(groupedAndFlattened).toHaveLength(5); // As calculated in the previous test
    expect(
      groupedAndFlattened.filter((item) => typeof item === "string"),
    ).toHaveLength(2); // Two dates
    expect(
      groupedAndFlattened.filter((item) => typeof item === "object"),
    ).toHaveLength(3); // Three transactions
  });
});
