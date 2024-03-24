import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";
import { useMemo } from "react";
import { Image, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { H3, H6, Stack } from "tamagui";

import { AddTransactionButton } from "../../components/AddTransactionButton";
import { TransactionItem } from "../../components/TransactionItem";
import { ArrowLeft } from "../../components/icons/ArrowLeft";
import { i18n } from "../../lib/i18n";
import { useTransactionsStore } from "../../stores/transactions";
import { styles } from "../../styles/styles";
import { Transaction } from "../../types";

export default function Page() {
  const transactions = useTransactionsStore((state) => state.transactions);

  const transactionsByDateUnique = useMemo(() => {
    // First, group transactions by date
    const grouped = transactions.reduce(
      (acc: { [key: string]: any }, transaction) => {
        const date = new Date(transaction.createdAt).toLocaleDateString(
          "fr-FR",
          {
            year: "numeric",
            month: "long",
            day: "2-digit",
          },
        );
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(transaction);
        return acc;
      },
      {},
    );

    const result: (string | Transaction)[] = [];
    Object.entries(grouped).forEach(([date, transactions]) => {
      result.push(date);
      transactions.forEach((transaction: Transaction) =>
        result.push(transaction),
      );
    });

    return result;
  }, [transactions]);

  return (
    <Stack flex={1} backgroundColor="$purple2">
      <Image
        style={styles.cardContainer}
        source={require("../../assets/images/shape.png")}
      />
      <SafeAreaView edges={["top"]} style={[styles.flex, styles.padding]}>
        <Stack flexDirection="row" alignItems="center">
          <Pressable onPress={router.back} hitSlop={30}>
            <ArrowLeft color="#FCFAFF" />
          </Pressable>
          <H3 marginLeft="$2" color="$purple2">
            {i18n.t("transactions.title")}
          </H3>
          <AddTransactionButton marginVertical={0} marginRight={0} />
        </Stack>

        <Stack
          marginVertical="$4"
          borderRadius={16}
          backgroundColor="white"
          flex={1}
          overflow="hidden"
        >
          <FlashList
            contentContainerStyle={{ padding: 18 }}
            data={transactionsByDateUnique}
            renderItem={({ item, index }) => {
              if (typeof item === "string") {
                // Rendering header
                return (
                  <H6
                    marginBottom="$2"
                    fontSize="$3"
                    color="$gray10"
                    marginTop={index === 0 ? 0 : 18}
                  >
                    {item}
                  </H6>
                );
              } else {
                // Render item
                return (
                  <Stack marginBottom="$2">
                    <TransactionItem transaction={item} withDate={false} />
                  </Stack>
                );
              }
            }}
            getItemType={(item) => {
              return typeof item === "string" ? "sectionHeader" : "row";
            }}
            estimatedItemSize={100}
          />
        </Stack>
      </SafeAreaView>
    </Stack>
  );
}
