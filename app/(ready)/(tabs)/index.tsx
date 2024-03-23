import { Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "tamagui";

import { BalanceCard } from "../../../components/BalanceCard";
import { Button } from "../../../components/Button";
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
        <Button
          marginLeft="auto"
          backgroundColor="$purple9"
          width="$5"
          height="$5"
          marginRight="$4"
          marginVertical="$2"
          borderRadius={999}
        >
          <Plus color="#FFF" size={26} />
        </Button>

        <BalanceCard />

        <RestPerMonth />
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
