import { BlurView } from "expo-blur";
import { StyleSheet } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
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
  const tY = useSharedValue<number>(0);
  const tX = useSharedValue<number>(0);

  const cardAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: cardHeight,
      width: cardWidth,
      alignSelf: "center",
      borderRadius: 16,
      overflow: "hidden",
      position: "absolute",
      bottom: -cardHeight / 2,
      transform: [{ translateY: tY.value }, { translateX: tX.value }],
    };
  });

  const gesture = Gesture.Pan()
    .onUpdate(({ translationX, translationY }) => {
      tX.value = translationX / 3;
      tY.value = translationY / 3;
    })
    .onEnd(() => {
      tX.value = withTiming(0);
      tY.value = withTiming(0);
    });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={cardAnimatedStyle}>
        <Stack
          flex={1}
          enterStyle={{
            opacity: 0,
          }}
          animation="lazy"
        >
          <BlurView style={styles.card} intensity={100} tint="extraLight">
            <Stack flexDirection="row" alignItems="center">
              <Text color="$purple9" fontSize="$10" fontWeight="900">
                {Intl.NumberFormat("fr-FR", {
                  currency: "EUR",
                }).format(balance)}
              </Text>
              <Text fontSize="$8" color="$purple9" marginTop="$3">
                €
              </Text>
            </Stack>
          </BlurView>
        </Stack>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
  },
});
