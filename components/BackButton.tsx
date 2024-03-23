import { Button } from "./Button";
import { ArrowLeft } from "./icons/ArrowLeft";

type Props = {
  onPress: () => void;
};

export function BackButton({ onPress }: Props) {
  return (
    <Button width="$5" height="$5" borderRadius={1000} onPress={onPress}>
      <ArrowLeft />
    </Button>
  );
}
