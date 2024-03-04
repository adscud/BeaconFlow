import { router } from "expo-router";
import { useState } from "react";
import { Dimensions } from "react-native";
import { H6, Input, View, XStack } from "tamagui";

import { Button } from "./Button";
import { ArrowLeft } from "./icons/ArrowLeft";
import { ArrowRight } from "./icons/ArrowRight";
import { i18n } from "../lib/i18n";

const { width } = Dimensions.get("window");

export function EnterCurrentBalance() {
  const [balance, setBalance] = useState<string>("");
  const disabled = !balance || balance === "0" || Number.isNaN(+balance);

  const handlePrevStep = () => {
    router.setParams({ step: "2" });
  };

  const handleNextStep = () => {
    //
  };

  return (
    <View width={width} paddingHorizontal="$4">
      <H6>{i18n.t("onboarding.balance.label")}</H6>
      <XStack marginTop="$4" alignItems="center">
        <Button
          size="$2"
          marginRight="$2"
          backgroundColor="white"
          onPress={handlePrevStep}
        >
          <ArrowLeft />
        </Button>
        <Input
          flex={1}
          keyboardType="numeric"
          value={balance}
          placeholder={i18n.t("onboarding.balance.placeholder")}
          onChangeText={setBalance}
        />

        <Button marginLeft="$2" disabled={disabled} onPress={handleNextStep}>
          <ArrowRight />
        </Button>
      </XStack>
    </View>
  );
}
