import { create } from "zustand";

import { Settings } from "../types";

type Store = {
  settings: Settings | null;
  setSettings: (settings: Settings) => void;
};

export const useSettingsStore = create<Store>((set) => ({
  settings: null,
  setSettings: (settings) => set({ settings }),
}));
