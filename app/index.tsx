import { SafeAreaView } from "react-native-safe-area-context";
import { Button, H2, H4, H6, Paragraph, Text, View } from "tamagui";

import { AddTransactionButton } from "../components/AddTransactionButton";
import { Card } from "../components/Card";
import { HomeShape } from "../components/HomeShape";
import { Transactions } from "../components/Transactions";
import { Plus } from "../components/icons/Plus";
import { i18n } from "../lib/i18n";
import { DatabaseService } from "../services/DatabaseService";
import { TransactionService } from "../services/TransactionService";
import { useTransactionsStore } from "../stores/transactions";

export default function Page() {
  const [transactions] = useTransactionsStore((state) => [state.transactions]);
  const date = new Date();
  const balance = transactions.reduce((acc, transaction) => {
    return acc + transaction.amount;
  }, 0);
  const transactionsByDate = TransactionService.shared.group(transactions);

  const onLayoutFetchTransactions = () => {
    DatabaseService.shared.init();
    DatabaseService.shared.fetchTransactions();
  };

  return (
    <View
      flex={1}
      position="relative"
      backgroundColor="white"
      enterStyle={{
        opacity: 0,
      }}
      animation="lazy"
      onLayout={onLayoutFetchTransactions}
    >
      <HomeShape />
      <SafeAreaView style={{ flex: 1 }}>
        <View paddingVertical="$3" paddingHorizontal="$4">
          <H6 color="white">Beacon flow</H6>
          <H4 color="white" textTransform="capitalize">
            {date.toLocaleDateString("fr-FR", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </H4>
        </View>
        <Card>
          <View
            padding="$4"
            alignItems={!balance ? "center" : "flex-start"}
            justifyContent={!balance ? "center" : "flex-start"}
          >
            <H6 color="$purple8" fontWeight="900">
              {i18n.t("home.balance")}
            </H6>
            <H2 color={!balance ? "$purple8" : "white"}>
              {Intl.NumberFormat("fr-FR", {
                style: "currency",
                currency: "EUR",
              }).format(balance)}
            </H2>
            {!balance && (
              <AddTransactionButton initial>
                <Plus />
                {i18n.t("home.addBalance")}
              </AddTransactionButton>
            )}
          </View>
        </Card>
        {!balance && (
          <View m="auto" zIndex={-1}>
            <Paragraph textAlign="center" color="$gray10">
              {i18n.t("home.welcome")}
            </Paragraph>
          </View>
        )}
        {!!balance && <Transactions data={transactionsByDate} />}
        <Button onPress={DatabaseService.shared.drop}>
          <Text>Drop</Text>
        </Button>
      </SafeAreaView>
    </View>
  );
}
