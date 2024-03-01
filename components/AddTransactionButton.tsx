import { router } from "expo-router";
import { PropsWithChildren } from "react";
import { Button } from "tamagui";

type Props = PropsWithChildren & {
  initial?: boolean;
};

export function AddTransactionButton({ children, initial = false }: Props) {
  const handleTo = () => {
    if (initial) {
      router.push("/write-initial-balance");
    } else {
      // router.push("/write-transaction");
    }
  };

  return (
    <Button
      backgroundColor="$purple10"
      borderColor="$purple10"
      animation="lazy"
      transform={[{ scale: 1 }]}
      pressStyle={{
        backgroundColor: "$purple9",
        borderColor: "$purple9",
        transform: [{ scale: 0.95 }],
      }}
      color="white"
      onPress={handleTo}
    >
      {children}
    </Button>
  );
}
