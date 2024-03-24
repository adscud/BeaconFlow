import { createContext, PropsWithChildren, useContext, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  ScrollView,
  StyleSheet,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Button, H3, H6, Input, Stack, Text, TextArea } from "tamagui";

import { BackButton } from "../components/BackButton";
import { db } from "../lib/database";
import { i18n } from "../lib/i18n";
import { useSettingsStore } from "../stores/settings";
import { useTransactionsStore } from "../stores/transactions";
import { Transaction } from "../types";

const AddTransactionContext = createContext<{ open: () => void }>({
  open: () => {},
});

export function useAddTransaction() {
  return useContext(AddTransactionContext).open;
}

export const AddTransactionProvider = ({ children }: PropsWithChildren) => {
  const [visible, setVisible] = useState<boolean>(false);

  const open = () => setVisible(true);
  const handleClose = () => setVisible(false);

  return (
    <AddTransactionContext.Provider value={{ open }}>
      {children}
      <AddTransaction visible={visible} handleClose={handleClose} />
    </AddTransactionContext.Provider>
  );
};

type AddTransactionProps = {
  visible: boolean;
  handleClose: () => void;
};

const BASE_TX: {
  amount: string;
  name: string;
  description: string;
  type: "expense" | "income";
} = {
  amount: "",
  name: "",
  description: "",
  type: "expense",
};

function AddTransaction({ visible, handleClose }: AddTransactionProps) {
  const [settings, setSettings] = useSettingsStore((store) => [
    store.settings,
    store.setSettings,
  ]);
  const [add, count, setCount] = useTransactionsStore((store) => [
    store.addTransaction,
    store.count,
    store.setCount,
  ]);
  const [transaction, setTransaction] = useState<typeof BASE_TX>(BASE_TX);
  const disabled =
    !transaction.amount ||
    !transaction.name ||
    Number.isNaN(+transaction.amount) ||
    Number(transaction.amount) <= 0;

  const handleToggleType = (type: "expense" | "income") => {
    setTransaction({ ...transaction, type });
  };

  const handleAmountChange = (amount: string) => {
    setTransaction({ ...transaction, amount });
  };

  const handleNameChange = (name: string) => {
    setTransaction({ ...transaction, name });
  };

  const handleDescriptionChange = (description: string) => {
    setTransaction({ ...transaction, description });
  };

  const handleAdd = () => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO transactions (amount, name, description, type, createdAt) VALUES (?, ?, ?, ?, ?)`,
        [
          transaction.amount,
          transaction.name,
          transaction.description,
          transaction.type,
          new Date().toISOString(),
        ],
        () => {
          add({
            id: Date.now(),
            amount: Number(transaction.amount),
            name: transaction.name,
            description: transaction.description,
            type: transaction.type,
            createdAt: new Date(),
          });
          setCount(count + 1);
          if (settings) {
            const newBalance =
              settings.current_balance +
              (transaction.type === "expense" ? -1 : 1) *
                Number(transaction.amount);

            setSettings({
              ...settings,
              current_balance: newBalance,
            });

            tx.executeSql(
              `UPDATE settings SET current_balance = ? WHERE id = 1`,
              [newBalance],
              (_, result) => {},
              (_, error) => {
                console.error("Error updating balance", error);
                return true;
              },
            );
          }

          setTransaction(BASE_TX);
          handleClose();
        },
        (_, error) => {
          console.error("Error adding transaction", error);
          return true;
        },
      );
    });
  };

  return (
    <Modal visible={visible} animationType="slide">
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <KeyboardAvoidingView style={styles.flex} enabled behavior="padding">
            <ScrollView style={styles.flex}>
              <Stack flexDirection="row" alignItems="center">
                <BackButton onPress={handleClose} />
                <H3 marginLeft="$2" color="$purple12">
                  {i18n.t("addTransaction.title")}
                </H3>
              </Stack>

              <Stack flexDirection="row" marginTop="$8" gap="$2">
                <TypeButton
                  type="expense"
                  currentType={transaction.type}
                  text={i18n.t("addTransaction.expense")}
                  onPress={handleToggleType}
                />
                <TypeButton
                  type="income"
                  currentType={transaction.type}
                  text={i18n.t("addTransaction.income")}
                  onPress={handleToggleType}
                />
              </Stack>

              <Stack marginTop="$4">
                <Text marginBottom="$2" color="$purple12">
                  {i18n.t("addTransaction.amount")}
                </Text>
                <Input
                  placeholder="200"
                  defaultValue={transaction.amount}
                  onChangeText={handleAmountChange}
                  keyboardType="numeric"
                />
              </Stack>

              <Stack marginTop="$4">
                <Text marginBottom="$2" color="$purple12">
                  {i18n.t("addTransaction.name")}
                </Text>
                <Input
                  placeholder={i18n.t("addTransaction.namePlaceholder")}
                  defaultValue={transaction.name}
                  onChangeText={handleNameChange}
                />
              </Stack>
              <Stack marginTop="$4">
                <Text marginBottom="$2" color="$purple12">
                  {i18n.t("addTransaction.description")}
                </Text>
                <TextArea
                  textAlignVertical="top"
                  placeholder={i18n.t("addTransaction.descriptionPlaceholder")}
                  defaultValue={transaction.description}
                  onChangeText={handleDescriptionChange}
                  minHeight="$8"
                />
              </Stack>
            </ScrollView>

            <Button
              theme="purple"
              marginTop="auto"
              marginVertical="$4"
              disabled={disabled}
              onPress={handleAdd}
            >
              <Text color="$purple10" fontWeight="900">
                {i18n.t("onboarding.addRecurrentExpense.add")}
              </Text>
            </Button>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </SafeAreaProvider>
    </Modal>
  );
}

type TypeButtonProps = {
  currentType: "expense" | "income";
  type: "expense" | "income";
  text: string;
  onPress: (type: "expense" | "income") => void;
};

function TypeButton({ currentType, type, text, onPress }: TypeButtonProps) {
  return (
    <Button
      flex={1}
      backgroundColor={type === currentType ? "$purple5" : "$purple2"}
      onPress={() => onPress(type)}
    >
      <H6 fontWeight={type === currentType ? "800" : "600"} color="$purple12">
        {text}
      </H6>
    </Button>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 18,
  },
  flex: {
    flex: 1,
  },
});
