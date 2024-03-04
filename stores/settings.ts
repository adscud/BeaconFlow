import { create } from "zustand";

import { Settings } from "../types";

type Store = {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  settings: Settings | null;
  setSettings: (settings: Settings) => void;
};

export const useSettingsStore = create<Store>((set) => ({
  loading: true,
  setLoading: (loading) => set({ loading }),
  settings: null,
  setSettings: (settings) => set({ settings }),
}));
