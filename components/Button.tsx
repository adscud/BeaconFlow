import { Button as ButtonProvider, ButtonProps } from "tamagui";

export function Button(props: ButtonProps) {
  return (
    <ButtonProvider
      theme="purple"
      {...props}
      pressStyle={{
        transform: [{ scale: 0.97 }],
      }}
      transform={[{ scale: 1 }]}
      animation="lazy"
    />
  );
}
