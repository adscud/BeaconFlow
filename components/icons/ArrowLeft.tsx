import { ArrowLeftCircle } from "lucide-react-native";

type Props = {
  color?: string;
};

export function ArrowLeft({ color = "#2B0E44" }: Props) {
  return <ArrowLeftCircle size={20} color={color} />;
}
