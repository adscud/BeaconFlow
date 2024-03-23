import { Button } from "./Button";
import { ArrowLeft } from "./icons/ArrowLeft";

export function BackButton() {
  return (
    <Button width="$5" height="$5" borderRadius={1000}>
      <ArrowLeft />
    </Button>
  );
}
