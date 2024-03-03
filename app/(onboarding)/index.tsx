import { router } from "expo-router";
import { ArrowRightCircle } from "lucide-react-native";
import { useState } from "react";
import { Keyboard } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import { Button, H6, Input, View, XStack } from "tamagui";

import { useOnboardingStep } from "../../hooks/useOnboardingStep";
import { i18n } from "../../lib/i18n";

export default function Page() {
  const { width } = useSafeAreaFrame();
  const step = useOnboardingStep();
  const [salary, setSalary] = useState<string>("");

  const salaryAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(
            interpolate(step.value, [1, 2], [0, -width], Extrapolation.CLAMP),
          ),
        },
      ],
    };
  });

  return (
    <View padding="$4" backgroundColor="white">
      <Animated.View style={salaryAnimatedStyle}>
        <Salary value={salary} onChange={setSalary} />
      </Animated.View>
    </View>
  );
}

type SalaryProps = {
  value: string;
  onChange: (value: string) => void;
};

function Salary({ value, onChange }: SalaryProps) {
  const disabled = !value || value === "0";

  const handleNextStep = () => {
    Keyboard.dismiss();
    router.setParams({ step: "2" });
  };

  return (
    <>
      <H6>{i18n.t("onboarding.salary.label")}</H6>
      <XStack marginTop="$4">
        <Input
          flex={1}
          keyboardType="numeric"
          value={value}
          placeholder={i18n.t("onboarding.salary.placeholder")}
          onChangeText={onChange}
        />

        <Button
          marginLeft="$2"
          theme="purple"
          disabled={disabled}
          onPress={handleNextStep}
        >
          <ArrowRightCircle color="#2B0E44" />
        </Button>
      </XStack>
    </>
  );
}
