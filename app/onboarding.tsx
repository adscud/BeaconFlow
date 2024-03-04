import { useGlobalSearchParams } from "expo-router";
import { useRef } from "react";
import { Dimensions, ImageBackground } from "react-native";
import { ScrollView as RNScrollView } from "react-native/Libraries/Components/ScrollView/ScrollView";
import Animated, {
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { H3, Paragraph, ScrollView, View } from "tamagui";

import { EnterCurrentBalance } from "../components/EnterCurrentBalance";
import { EnterRecurrentExpenses } from "../components/EnterRecurrentExpenses";
import { EnterSalary } from "../components/EnterSalary";
import { i18n } from "../lib/i18n";

const { width } = Dimensions.get("window");

export default function Page() {
  const tier = (width - 36) / 3;
  const listRef = useRef<RNScrollView>(null);
  const params = useGlobalSearchParams<{ step: string }>();
  const step = useDerivedValue(() => {
    return params.step ? parseInt(params.step, 10) : 1;
  });

  const scrollTo = (x: number) => {
    listRef.current?.scrollTo({ x, animated: true });
  };

  useAnimatedReaction(
    () => step.value,
    (value) => {
      if (listRef.current) {
        runOnJS(scrollTo)((value - 1) * width);
      }
    },
  );

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
        opacity: 0,
      }}
      flex={1}
      animation="lazy"
    >
      <ImageBackground
        source={require("../assets/images/shape.png")}
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
      <View flex={1} paddingVertical="$4">
        <ScrollView
          ref={listRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
        >
          <EnterSalary />
          <EnterRecurrentExpenses />
          <EnterCurrentBalance />
        </ScrollView>
      </View>
    </View>
  );
}
