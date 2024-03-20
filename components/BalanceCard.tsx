import { BlurView } from "expo-blur";
import { ImageBackground, StyleSheet } from "react-native";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import { Stack, Text } from "tamagui";

import { useSettingsStore } from "../stores/settings";

export function BalanceCard() {
  const balance = useSettingsStore(
    (store) => store.settings?.current_balance ?? 0,
  );
  const { width } = useSafeAreaFrame();
  const cardWidth = width - 64;
  const cardHeight = cardWidth / 1.62;

  return (
    <ImageBackground
      style={styles.cardContainer}
      source={require("../assets/images/shape.png")}
    >
      <Stack
        width={cardWidth}
        height={cardHeight}
        alignSelf="center"
        borderRadius={16}
        overflow="hidden"
        position="absolute"
        borderWidth={1}
        borderColor="$purple1"
        bottom={-cardHeight / 2}
      >
        <BlurView style={styles.card} intensity={100} tint="extraLight">
          <Text color="$purple9" fontSize="$12" fontWeight="900">
            {balance}
          </Text>
        </BlurView>
      </Stack>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 0.2,
    position: "relative",
  },
  card: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
  },
});
