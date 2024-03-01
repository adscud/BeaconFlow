import { LinearGradient } from "@tamagui/linear-gradient";
import { Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, H2, H4, H6, Paragraph, Text, View } from "tamagui";

import { AddTransactionButton } from "../components/AddTransactionButton";
import { Card } from "../components/Card";
import { Plus } from "../components/icons/Plus";
import { db } from "../lib/database";
import { i18n } from "../lib/i18n";
import { DatabaseService } from "../services/DatabaseService";
import { useTransactionsStore } from "../stores/transactions";

const { width, height } = Dimensions.get("window");

export default function Page() {
  const [transactions] = useTransactionsStore((state) => [state.transactions]);
  const date = new Date();
  const balance = transactions.reduce((acc, transaction) => {
    return acc + transaction.amount;
  }, 0);

  const onLayoutFetchTransactions = () => {
    DatabaseService.shared.init();
    DatabaseService.shared.fetchTransactions();
  };

  return (
    <View
      flex={1}
      position="relative"
      enterStyle={{
        opacity: 0,
      }}
      animation="lazy"
      onLayout={onLayoutFetchTransactions}
    >
      <View
        height={width * 2}
        width={width * 2}
        backgroundColor="red"
        position="absolute"
        borderRadius={600}
        overflow="hidden"
        transform={[{ translateY: -width - 50 }, { translateX: -150 }]}
      >
        <LinearGradient
          flex={1}
          borderRadius="$4"
          colors={["$purple10", "$purple8"]}
          start={[1, 0]}
          end={[0, 1]}
        />
      </View>
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
            flex={1}
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
        <Button
          onPress={() => {
            db.transaction((tx) => {
              tx.executeSql(
                `DROP TABLE transactions;`,
                [],
                () => {
                  console.log("Dropped");
                },
                (_, error) => {
                  console.error("Error dropping table", error);
                  return true;
                },
              );
            });
          }}
        >
          <Text>Drop</Text>
        </Button>
      </SafeAreaView>
    </View>
  );
}
