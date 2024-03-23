import { BotIcon } from "lucide-react-native";
import { H2, H5, H6, Stack, Text, View } from "tamagui";

import { AddTransactionButton } from "./AddTransactionButton";
import { i18n } from "../lib/i18n";
import { useTransactionsStore } from "../stores/transactions";

export function LastTransactions() {
  const transactions = useTransactionsStore((state) =>
    state.transactions.slice(0, 3),
  );

  return (
    <Stack>
      <H5 fontSize="$3" textAlign="center" color="$gray10">
        {i18n.t("lastTransactions.title")}
      </H5>
      {transactions.length > 0 ? null : (
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
