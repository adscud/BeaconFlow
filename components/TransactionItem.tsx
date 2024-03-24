import { H3, Stack, Text } from "tamagui";

import { Transaction } from "../types";

type Props = {
  transaction: Transaction;
  withDate?: boolean;
};

export function TransactionItem({ transaction, withDate = true }: Props) {
  return (
    <Stack
      flexDirection="row"
      justifyContent="space-between"
      backgroundColor="$purple2"
      padding="$3"
      borderRadius={16}
    >
      <Stack justifyContent="center">
        <Text color="$purple12" fontSize="$6">
          {transaction.name}
        </Text>
        {withDate && (
          <Text color="$purple12" fontSize="$2">
            {new Date(transaction.createdAt).toLocaleDateString("fr-FR")}
          </Text>
        )}
      </Stack>

      <H3 color={transaction.type === "expense" ? "$red9" : "$green9"}>
        {transaction.type === "expense" ? "-" : "+"}
        {transaction.amount}€
      </H3>
    </Stack>
  );
}
