import { Image, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "tamagui";

import { AddTransactionButton } from "../../../components/AddTransactionButton";
import { BalanceCard } from "../../../components/BalanceCard";
import { LastTransactions } from "../../../components/LastTransactions";
import { RestPerMonth } from "../../../components/RestPerMonth";

export default function Page() {
  return (
    <Stack
      flex={1}
      backgroundColor="$purple2"
      enterStyle={{
        opacity: 0,
      }}
      animation="lazy"
    >
      <Image
        style={styles.cardContainer}
        source={require("../../../assets/images/shape.png")}
      />
      <SafeAreaView edges={["top"]} style={styles.flex}>
        <ScrollView style={styles.flex}>
          <AddTransactionButton />
          <BalanceCard />
          <RestPerMonth />
          <LastTransactions />
        </ScrollView>
      </SafeAreaView>
    </Stack>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  cardContainer: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    height: "30%",
  },
});
