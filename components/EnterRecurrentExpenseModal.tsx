import { Picker } from "@react-native-picker/picker";
import { forwardRef, useImperativeHandle, useState } from "react";
import { Modal, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { H3, Input, Text, XStack } from "tamagui";

import { Button } from "./Button";
import { Close } from "./icons/Close";
import { ExpenseLabel } from "../constants";
import { i18n } from "../lib/i18n";
import { RecurrentExpense } from "../types";

type AddRecurrentExpenseModalProps = {
  onAdd: (expense: RecurrentExpense) => void;
};

export const AddRecurrentExpenseModal = forwardRef<
  {
    present: () => void;
  },
  AddRecurrentExpenseModalProps
>((props, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const [expense, setExpense] = useState<{
    name: string;
    amount: string;
    label: string;
  }>({
    name: "",
    amount: "",
    label: "rent",
  });
  const disabled =
    !expense.name || !expense.amount || Number.isNaN(+expense.amount);

  const handleAdd = () => {
    props.onAdd({
      id: new Date().getTime(),
      name: expense.name.trim(),
      label: expense.label as ExpenseLabel,
      amount: +expense.amount,
    });
    handleClose();
  };

  const handleClose = () => {
    setIsVisible(false);
    setExpense({
      name: "",
      amount: "",
      label: "rent",
    });
  };

  useImperativeHandle(ref, () => ({
    present: () => setIsVisible(true),
  }));

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <SafeAreaView
        edges={Platform.OS === "android" ? ["top", "bottom"] : ["bottom"]}
        style={{ flex: 1, padding: 18 }}
      >
        <XStack alignItems="center" marginBottom="$4">
          <H3 marginRight="auto">
            {i18n.t("onboarding.addRecurrentExpense.title")}
          </H3>
          <Button onPress={handleClose}>
            <Close />
          </Button>
        </XStack>
        <Text mb="$2">{i18n.t("onboarding.addRecurrentExpense.name")}</Text>
        <Input
          placeholder={i18n.t("onboarding.addRecurrentExpense.namePlaceholder")}
          value={expense.name}
          onChangeText={(name) => setExpense({ ...expense, name })}
        />
        <Text mb="$2" marginTop="$4">
          {i18n.t("onboarding.addRecurrentExpense.amount")}
        </Text>
        <Input
          placeholder={i18n.t(
            "onboarding.addRecurrentExpense.amountPlaceholder",
          )}
          value={expense.amount}
          onChangeText={(amount) => setExpense({ ...expense, amount })}
          keyboardType="numeric"
        />

        <Text mb="$2" marginTop="$4">
          {i18n.t("onboarding.addRecurrentExpense.label")}
        </Text>
        <Picker
          selectedValue={expense.label}
          onValueChange={(label) => setExpense({ ...expense, label })}
        >
          <Picker.Item
            label={i18n.t(`expenseLabel.${ExpenseLabel.Gas}`)}
            value={ExpenseLabel.Gas}
          />
          <Picker.Item
            label={i18n.t(`expenseLabel.${ExpenseLabel.Electricity}`)}
            value={ExpenseLabel.Electricity}
          />
          <Picker.Item
            label={i18n.t(`expenseLabel.${ExpenseLabel.Insurance}`)}
            value={ExpenseLabel.Insurance}
          />
          <Picker.Item
            label={i18n.t(`expenseLabel.${ExpenseLabel.Rent}`)}
            value={ExpenseLabel.Rent}
          />
          <Picker.Item
            label={i18n.t(`expenseLabel.${ExpenseLabel.Internet}`)}
            value={ExpenseLabel.Internet}
          />
          <Picker.Item
            label={i18n.t(`expenseLabel.${ExpenseLabel.Water}`)}
            value={ExpenseLabel.Water}
          />
          <Picker.Item
            label={i18n.t(`expenseLabel.${ExpenseLabel.Subscription}`)}
            value={ExpenseLabel.Subscription}
          />
          <Picker.Item
            label={i18n.t(`expenseLabel.${ExpenseLabel.Other}`)}
            value={ExpenseLabel.Other}
          />
        </Picker>
        <Button
          theme="purple"
          marginTop="auto"
          marginBottom="$4"
          disabled={disabled}
          onPress={handleAdd}
        >
          <Text color="$purple10" fontWeight="900">
            {i18n.t("onboarding.addRecurrentExpense.add")}
          </Text>
        </Button>
      </SafeAreaView>
    </Modal>
  );
});
