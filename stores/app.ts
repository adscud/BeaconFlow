import { create } from "zustand";

type Store = {
  loading: boolean;
  setLoading: (loading: boolean) => void;
};

export const useAppStore = create<Store>((set) => ({
  loading: true,
  setLoading: (loading) => set({ loading }),
}));
