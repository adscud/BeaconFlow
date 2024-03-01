import { router } from "expo-router";
import { PropsWithChildren } from "react";
import { Button } from "tamagui";

export function AddTransactionButton({ children }: PropsWithChildren) {
  const handleToWriteTransaction = () => {
    router.push("/write-transaction");
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
      onPress={handleToWriteTransaction}
    >
      {children}
    </Button>
  );
}
