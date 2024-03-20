import { PlusCircle } from "lucide-react-native";

type Props = {
  size?: number;
  color?: string;
};

export function Plus({ size = 20, color = "#2B0E44" }: Props) {
  return <PlusCircle size={size} color={color} />;
}
