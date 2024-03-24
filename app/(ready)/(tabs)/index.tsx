import { Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "tamagui";

import { AddTransactionButton } from "../../../components/AddTransactionButton";
import { BalanceCard } from "../../../components/BalanceCard";
import { LastTransactions } from "../../../components/LastTransactions";
import { RestPerMonth } from "../../../components/RestPerMonth";
import { styles } from "../../../styles/styles";

export default function Page() {
  return (
    <Stack flex={1} backgroundColor="$purple2" animation="lazy">
      <Image
        style={styles.cardContainer}
        source={require("../../../assets/images/shape.png")}
      />
      <SafeAreaView edges={["top"]} style={styles.flex}>
        <ScrollView style={styles.flex} showsVerticalScrollIndicator={false}>
          <AddTransactionButton />
          <BalanceCard />
          <RestPerMonth />
          <LastTransactions />
        </ScrollView>
      </SafeAreaView>
    </Stack>
  );
}
