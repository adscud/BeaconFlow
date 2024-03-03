import { ArrowRightCircle } from "lucide-react-native";

type Props = {
  color?: string;
};

export function ArrowRight({ color = "#2B0E44" }: Props) {
  return <ArrowRightCircle size={20} color={color} />;
}
