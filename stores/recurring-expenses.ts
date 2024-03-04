import { create } from "zustand";

import { RecurrentExpense } from "../types";

type Store = {
  expenses: RecurrentExpense[];
  setExpenses: (expenses: RecurrentExpense[]) => void;
};

export const useRecurringExpenses = create<Store>((set) => ({
  expenses: [],
  setExpenses: (expenses) => set({ expenses }),
}));
