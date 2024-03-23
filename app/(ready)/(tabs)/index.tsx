import { Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "tamagui";

import { AddTransactionButton } from "../../../components/AddTransactionButton";
import { BalanceCard } from "../../../components/BalanceCard";
import { Button } from "../../../components/Button";
import { LastTransactions } from "../../../components/LastTransactions";
import { RestPerMonth } from "../../../components/RestPerMonth";
import { Plus } from "../../../components/icons/Plus";

export default function Page() {
  return (
    <Stack
      flex={1}
      backgroundColor="white"
      enterStyle={{
        opacity: 0,
      }}
      animation="lazy"
    >
      <Image
        style={styles.cardContainer}
        source={require("../../../assets/images/shape.png")}
      />
      <SafeAreaView edges={["top"]}>
        <AddTransactionButton />
        <BalanceCard />
        <RestPerMonth />
        <LastTransactions />
      </SafeAreaView>
    </Stack>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    height: "30%",
  },
});
