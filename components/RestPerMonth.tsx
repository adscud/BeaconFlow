import { H1, H4, H5, Stack, Text, View } from "tamagui";

import { i18n } from "../lib/i18n";
import { useRecurringExpenses } from "../stores/recurring-expenses";
import { useSettingsStore } from "../stores/settings";

export function RestPerMonth() {
  const salary = useSettingsStore((state) => state.settings?.salary ?? 0);
  const recurrentExpensesAmount = useRecurringExpenses((state) =>
    state.expenses.reduce((acc, expense) => acc + expense.amount, 0),
  );
  const disposableIncome = salary - recurrentExpensesAmount;

  const savings = disposableIncome * 0.4;
  const debt = disposableIncome * 0.2;
  const spending = disposableIncome - savings - debt;

  return (
    <Stack margin="$4" paddingHorizontal="$4" borderRadius={16}>
      <H5 fontSize="$3" textAlign="center" color="$gray10">
        {i18n.t("restPerMonth.title", { n: disposableIncome.toFixed(2) })}
      </H5>
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        marginVertical="$4"
      >
        <InfoLayout title={i18n.t("restPerMonth.savings")} value={savings} />
        <InfoLayout title={i18n.t("restPerMonth.spending")} value={spending} />
        <InfoLayout title={i18n.t("restPerMonth.debt")} value={debt} />
      </Stack>
    </Stack>
  );
}

type InfoLayoutProps = {
  title: string;
  value: number;
};

function InfoLayout({ title, value }: InfoLayoutProps) {
  return (
    <Stack>
      <Text fontSize="$4" fontWeight="bold" textTransform="uppercase">
        {title}
      </Text>
      <H4>{value.toFixed(2)}€</H4>
    </Stack>
  );
}