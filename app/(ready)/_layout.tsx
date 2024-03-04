import { Redirect, Slot } from "expo-router";

import { useSettingsStore } from "../../stores/settings";

export default function Layout() {
  const [loading, settings] = useSettingsStore((store) => [
    store.loading,
    store.settings,
  ]);
  console.log({ settings });

  if (!loading && !settings) {
    return <Redirect href="/onboarding" />;
  }

  if (!loading && settings && !settings.ready) {
    if (!settings.salary) {
      // @ts-ignore
      return <Redirect href="/onboarding?step=1" />;
    }

    return <Redirect href="/onboarding" />;
  }

  return <Slot />;
}
