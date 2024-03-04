import { X } from "lucide-react-native";

type Props = {
  color?: string;
};

export function Close({ color = "#2B0E44" }: Props) {
  return <X size={20} color={color} />;
}
