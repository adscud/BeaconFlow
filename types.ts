export type Transaction = {
  id: number;
  amount: number;
  name: string;
  description: string | null;
  type: "income" | "expense" | "initial";
  createdAt: Date;
};
