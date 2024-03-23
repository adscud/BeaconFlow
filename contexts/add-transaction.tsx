import { createContext, PropsWithChildren, useContext, useState } from "react";
import { Modal, StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Button, H3, H6, Stack } from "tamagui";

import { BackButton } from "../components/BackButton";
import { i18n } from "../lib/i18n";

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

function AddTransaction({ visible, handleClose }: AddTransactionProps) {
  const [transaction, setTransaction] = useState<{
    amount: number;
    name: string;
    description: string;
    type: "expense" | "income";
  }>({
    amount: 0,
    name: "",
    description: "",
    type: "expense",
  });

  const handleToggleType = (type: "expense" | "income") => {
    setTransaction({ ...transaction, type });
  };

  return (
    <Modal visible={visible} animationType="slide">
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
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
    padding: 16,
  },
});
