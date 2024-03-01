import { create } from "zustand";

import { Transaction } from "../types";

type Store = {
  transactions: Transaction[];
  setTransactions: (transactions: Transaction[]) => void;
};

export const useTransactionsStore = create<Store>((set) => {
  return {
    transactions: [],
    setTransactions: (transactions) => set({ transactions }),
  };
});
