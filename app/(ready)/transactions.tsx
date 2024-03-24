import { router } from "expo-router";
import { Image, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { H3, Stack } from "tamagui";

import { AddTransactionButton } from "../../components/AddTransactionButton";
import { ArrowLeft } from "../../components/icons/ArrowLeft";
import { i18n } from "../../lib/i18n";
import { styles } from "../../styles/styles";

export default function Page() {
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
      </SafeAreaView>
    </Stack>
  );
}
