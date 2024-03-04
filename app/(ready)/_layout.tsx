import { Redirect, Slot } from "expo-router";

import { useAppStore } from "../../stores/app";
import { useRecurringExpenses } from "../../stores/recurring-expenses";
import { useSettingsStore } from "../../stores/settings";

export default function Layout() {
  const [loading] = useAppStore((store) => [store.loading]);
  const [settings] = useSettingsStore((store) => [store.settings]);
  const [expenses] = useRecurringExpenses((store) => [store.expenses]);

  if (!loading && !settings) {
    return <Redirect href="/onboarding" />;
  }

  if (!loading && settings && !settings.ready) {
    if (!settings.salary) {
      // @ts-ignore
      return <Redirect href="/onboarding?step=1" />;
    }

    if (!expenses.length) {
      // @ts-ignore
      return <Redirect href="/onboarding?step=2" />;
    }

    // @ts-ignore
    return <Redirect href="/onboarding?step=3" />;
  }

  return <Slot />;
}
