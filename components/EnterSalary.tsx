import { router } from "expo-router";
import { useState } from "react";
import { Dimensions, Keyboard } from "react-native";
import { H6, Input, View, XStack } from "tamagui";

import { Button } from "./Button";
import { ArrowRight } from "./icons/ArrowRight";
import { i18n } from "../lib/i18n";

const { width } = Dimensions.get("window");

export function EnterSalary() {
  const [salary, setSalary] = useState<string>("");
  const disabled = !salary || salary === "0" || Number.isNaN(+salary);

  const handleNextStep = () => {
    Keyboard.dismiss();
    router.setParams({ step: "2" });
  };

  return (
    <View width={width} paddingHorizontal="$4">
      <H6>{i18n.t("onboarding.salary.label")}</H6>
      <XStack marginTop="$4">
        <Input
          flex={1}
          keyboardType="numeric"
          value={salary}
          placeholder={i18n.t("onboarding.salary.placeholder")}
          onChangeText={setSalary}
        />

        <Button marginLeft="$2" disabled={disabled} onPress={handleNextStep}>
          <ArrowRight />
        </Button>
      </XStack>
    </View>
  );
}
