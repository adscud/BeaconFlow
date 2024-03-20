import { useMemo } from "react";
import { ImageBackground, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "tamagui";

import { BalanceCard } from "../../components/BalanceCard";
import { Button } from "../../components/Button";
import { Plus } from "../../components/icons/Plus";
import { useRecurringExpenses } from "../../stores/recurring-expenses";
import { useSettingsStore } from "../../stores/settings";

export default function Page() {
  const salary = useSettingsStore((store) => store.settings?.salary ?? 0);
  const recurringExpenses = useRecurringExpenses((store) => store.expenses);

  const amountOfRecurringExpenses = useMemo(() => {
    return recurringExpenses.reduce((acc, expense) => acc + expense.amount, 0);
  }, [recurringExpenses]);

  return (
    <Stack
      flex={1}
      enterStyle={{
        opacity: 0,
      }}
      animation="lazy"
    >
      <ImageBackground
        style={styles.cardContainer}
        source={require("../../assets/images/shape.png")}
      >
        <SafeAreaView edges={["top"]}>
          <Button
            marginLeft="auto"
            backgroundColor="$purple9"
            width="$5"
            height="$5"
            marginRight="$4"
            marginTop="$2"
            borderRadius={999}
          >
            <Plus color="#FFF" size={26} />
          </Button>
        </SafeAreaView>

        <BalanceCard />
      </ImageBackground>
    </Stack>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 0.3,
    position: "relative",
  },
});
