import { PlusCircle } from "lucide-react-native";

type Props = {
  color?: string;
};

export function Plus({ color = "#2B0E44" }: Props) {
  return <PlusCircle size={20} color={color} />;
}
