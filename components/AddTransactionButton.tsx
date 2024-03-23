import { ButtonProps } from "tamagui";

import { Button } from "./Button";
import { Plus } from "./icons/Plus";

type Props = ButtonProps;

export function AddTransactionButton(props: ButtonProps) {
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
    >
      <Plus color="#FFF" size={26} />
    </Button>
  );
}
