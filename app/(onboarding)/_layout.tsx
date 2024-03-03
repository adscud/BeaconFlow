import { Slot } from "expo-router";
import { Dimensions, ImageBackground } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { H3, Paragraph, View } from "tamagui";

import { useOnboardingStep } from "../../hooks/useOnboardingStep";
import { i18n } from "../../lib/i18n";

const { width } = Dimensions.get("window");

export default function Layout() {
  const tier = (width - 36) / 3;
  const step = useOnboardingStep();

  const progressAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: "100%",
      width: withTiming(tier * step.value),
      backgroundColor: "#2B0E44",
    };
  });

  return (
    <View
      enterStyle={{
        opacity: 1,
      }}
      flex={1}
      animation="lazy"
    >
      <ImageBackground
        source={require("../../assets/images/shape.png")}
        style={{ justifyContent: "center", width, height: "auto" }}
      >
        <SafeAreaView edges={["top"]} style={{ padding: 18 }}>
          <View
            height="$0.75"
            backgroundColor="$purple2"
            width="full"
            borderRadius="$12"
            overflow="hidden"
          >
            <Animated.View style={progressAnimatedStyle} />
          </View>
          <H3 color="$purple1" marginTop="$4">
            {i18n.t("onboarding.title")}
          </H3>
          <Paragraph color="$purple1">{i18n.t("onboarding.text")}</Paragraph>
        </SafeAreaView>
      </ImageBackground>
      <Slot />
    </View>
  );
}
