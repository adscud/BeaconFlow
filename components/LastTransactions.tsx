import { H5, Stack, Text } from "tamagui";

import { AddTransactionButton } from "./AddTransactionButton";
import { TransactionItem } from "./TransactionItem";
import { i18n } from "../lib/i18n";
import { useTransactionsStore } from "../stores/transactions";

export function LastTransactions() {
  const transactions = useTransactionsStore((state) =>
    state.transactions.slice(0, 3),
  );

  return (
    <Stack
      backgroundColor="white"
      marginHorizontal="$4"
      padding="$4"
      borderRadius={16}
    >
      <H5 fontSize="$3" textAlign="center" color="$gray10" marginBottom="$2">
        {i18n.t("lastTransactions.title")}
      </H5>
      {transactions.length > 0 ? (
        <Stack gap="$2">
          {transactions.map((transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))}
        </Stack>
      ) : (
        <Stack
          alignSelf="center"
          justifyContent="center"
          alignItems="center"
          marginVertical="$2"
        >
          <Text fontSize="$4" textAlign="center" color="$gray8" marginTop="$2">
            {i18n.t("lastTransactions.noTransaction")}
          </Text>
          <AddTransactionButton
            marginLeft={0}
            marginRight={0}
            marginTop="$3"
            width="$10"
          />
        </Stack>
      )}
    </Stack>
  );
}
