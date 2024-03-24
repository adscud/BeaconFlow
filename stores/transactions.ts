import { create } from "zustand";

import { Transaction } from "../types";

type Store = {
  count: number;
  transactions: Transaction[];
  setTransactions: (transactions: Transaction[]) => void;
  addTransaction: (transaction: Transaction) => void;
  setCount: (count: number) => void;
};

export const useTransactionsStore = create<Store>((set) => {
  return {
    count: 0,
    transactions: [],
    setTransactions: (transactions) => set({ transactions }),
    addTransaction: (transaction) =>
      set((state) => ({ transactions: [transaction, ...state.transactions] })),
    setCount: (count) => set({ count }),
  };
});
