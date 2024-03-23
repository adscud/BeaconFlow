import { createContext, PropsWithChildren, useContext, useState } from "react";
import { Modal } from "react-native";
import { Text } from "tamagui";

const AddTransactionContext = createContext<{ open: () => void }>({
  open: () => {},
});

export function useAddTransaction() {
  return useContext(AddTransactionContext).open;
}

export const AddTransactionProvider = ({ children }: PropsWithChildren) => {
  const [visible, setVisible] = useState<boolean>(false);

  const open = () => setVisible(true);

  return (
    <AddTransactionContext.Provider value={{ open }}>
      {children}

      <Modal visible={visible} animationType="slide">
        <Text>Add transaction!</Text>
      </Modal>
    </AddTransactionContext.Provider>
  );
};
