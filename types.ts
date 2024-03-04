export type Transaction = {
  id: number;
  amount: number;
  name: string;
  description: string | null;
  type: "income" | "expense" | "initial";
  createdAt: Date;
};

export type Settings = {
  id: number;
  ready: boolean;
  current_balance: number;
  salary: number;
  currency: string;
  language: string;
};

export type RecurrentExpense = {
  id: number;
  name: string;
  amount: number;
  label: string;
};
