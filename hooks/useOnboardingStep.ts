import { useGlobalSearchParams } from "expo-router";
import { useDerivedValue } from "react-native-reanimated";

export const useOnboardingStep = () => {
  const params = useGlobalSearchParams<{ step: string }>();

  return useDerivedValue(() => {
    return params.step ? parseInt(params.step, 10) : 1;
  });
};
