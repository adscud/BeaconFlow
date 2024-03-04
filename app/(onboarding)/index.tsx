import { useRef } from "react";
import { Dimensions, ScrollView as RNScrollView } from "react-native";
import { runOnJS, useAnimatedReaction } from "react-native-reanimated";
import { ScrollView, View } from "tamagui";

import { EnterCurrentBalance } from "../../components/EnterCurrentBalance";
import { EnterRecurrentExpenses } from "../../components/EnterRecurrentExpenses";
import { EnterSalary } from "../../components/EnterSalary";
import { useOnboardingStep } from "../../hooks/useOnboardingStep";

const { width } = Dimensions.get("window");
export default function Page() {
  const listRef = useRef<RNScrollView>(null);
  const step = useOnboardingStep();

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

  return (
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
  );
}
