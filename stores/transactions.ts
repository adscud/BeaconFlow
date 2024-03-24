import { create } from "zustand";

import { Transaction } from "../types";

type Store = {
  transactions: Transaction[];
  setTransactions: (transactions: Transaction[]) => void;
  addTransaction: (transaction: Transaction) => void;
};

export const useTransactionsStore = create<Store>((set) => {
  return {
    transactions: [],
    setTransactions: (transactions) => set({ transactions }),
    addTransaction: (transaction) =>
      set((state) => ({ transactions: [transaction, ...state.transactions] })),
  };
});
