import { Transaction } from "../types";

export class TransactionService {
  static shared = new TransactionService();

  normalizeDate(date: Date) {
    return date.toISOString().split("T")[0];
  }

  groupByDate(transactions: Transaction[]): Record<string, Transaction[]> {
    return transactions.reduce(
      (acc, transaction) => {
        const dateKey = this.normalizeDate(transaction.createdAt);
        if (!acc[dateKey]) {
          acc[dateKey] = [];
        }
        acc[dateKey].push(transaction);
        return acc;
      },
      {} as Record<string, Transaction[]>,
    );
  }

  flattenTransactions(
    groupedTransactions: Record<string, Transaction[]>,
  ): (string | Transaction)[] {
    const result: (string | Transaction)[] = [];

    Object.keys(groupedTransactions).forEach((date) => {
      result.push(date); // Add the date
      groupedTransactions[date].forEach((transaction) => {
        result.push(transaction); // Add each transaction for the date
      });
    });

    return result;
  }

  group = (transactions: Transaction[]) => {
    const groupedTransactions = this.groupByDate(transactions);
    return this.flattenTransactions(groupedTransactions);
  };
}
