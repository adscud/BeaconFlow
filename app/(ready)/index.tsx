import { useMemo } from "react";
import { ImageBackground, StyleSheet } from "react-native";
import { SafeAreaView, useSafeAreaFrame } from "react-native-safe-area-context";
import { Stack, Text, View } from "tamagui";

import { BalanceCard } from "../../components/BalanceCard";
import { Card } from "../../components/Card";
import { useRecurringExpenses } from "../../stores/recurring-expenses";
import { useSettingsStore } from "../../stores/settings";

export default function Page() {
  const salary = useSettingsStore((store) => store.settings?.salary ?? 0);
  const recurringExpenses = useRecurringExpenses((store) => store.expenses);

  const amountOfRecurringExpenses = useMemo(() => {
    return recurringExpenses.reduce((acc, expense) => acc + expense.amount, 0);
  }, [recurringExpenses]);

  return (
    <Stack flex={1}>
      <BalanceCard />
    </Stack>
  );
}
