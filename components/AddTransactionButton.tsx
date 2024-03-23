import { ButtonProps } from "tamagui";

import { Button } from "./Button";
import { Plus } from "./icons/Plus";
import {
  AddTransactionProvider,
  useAddTransaction,
} from "../contexts/add-transaction";

function Component(props: ButtonProps) {
  const addTransaction = useAddTransaction();

  return (
    <Button
      marginLeft="auto"
      backgroundColor="$purple9"
      width="$5"
      height="$5"
      marginRight="$4"
      marginVertical="$2"
      borderRadius={999}
      {...props}
      onPress={addTransaction}
    >
      <Plus color="#FFF" size={26} />
    </Button>
  );
}

export function AddTransactionButton(props: ButtonProps) {
  return (
    <AddTransactionProvider>
      <Component {...props} />
    </AddTransactionProvider>
  );
}
