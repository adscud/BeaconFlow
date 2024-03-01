import { LinearGradient } from "@tamagui/linear-gradient";
import { Dimensions } from "react-native";
import { View } from "tamagui";
const { width } = Dimensions.get("window");

export function HomeShape() {
  return (
    <View
      height={width * 2}
      width={width * 2}
      backgroundColor="red"
      position="absolute"
      borderRadius={600}
      overflow="hidden"
      transform={[{ translateY: -width - 50 }, { translateX: -150 }]}
    >
      <LinearGradient
        flex={1}
        borderRadius="$4"
        colors={["$purple10", "$purple8"]}
        start={[1, 0]}
        end={[0, 1]}
      />
    </View>
  );
}
