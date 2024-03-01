import { router } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, H4, Input, XStack } from "tamagui";

import { i18n } from "../lib/i18n";
import { DatabaseService } from "../services/DatabaseService";

export default function Page() {
  const [balance, setBalance] = useState<string>("");
  const disabled = !balance || balance === "0";

  const handleWriteInitialBalance = () => {
    if (disabled) {
      return;
    }

    DatabaseService.shared.setInitialBalance(Number(balance));
    router.back();
  };

  return (
    <KeyboardAvoidingView enabled style={{ flex: 1 }} behavior="padding">
      <SafeAreaView
        style={{
          backgroundColor: "white",
          flex: 1,
          padding: 16,
        }}
        edges={Platform.OS === "android" ? ["top", "bottom"] : ["bottom"]}
      >
        <XStack>
          <H4 testID="title">{i18n.t("writeInitialBalance.title")}</H4>
        </XStack>
        <Input
          testID="balance-input"
          marginVertical="$5"
          backgroundColor="white"
          borderColor="white"
          autoFocus
          placeholder={Intl.NumberFormat().format(1000)}
          value={balance.toString()}
          onChangeText={setBalance}
          keyboardType="number-pad"
        />
        <Button
          testID="submit-button"
          theme="purple"
          marginTop="auto"
          color="$purple10"
          fontWeight="900"
          borderColor="transparent"
          marginBottom="$4"
          transform={[{ scale: 1 }]}
          pressStyle={{
            transform: [{ scale: 0.95 }],
            borderColor: "transparent",
          }}
          animation="lazy"
          disabled={disabled}
          onPress={handleWriteInitialBalance}
        >
          {i18n.t("writeInitialBalance.submit")}
        </Button>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
