import { LinearGradient } from "@tamagui/linear-gradient";
import { SafeAreaView, useSafeAreaFrame } from "react-native-safe-area-context";
import { H2, H4, H6, View } from "tamagui";

import { Card } from "../components/Card";

export default function Page() {
  const frame = useSafeAreaFrame();
  const date = new Date();

  return (
    <View
      flex={1}
      position="relative"
      enterStyle={{
        opacity: 0,
      }}
      animation="lazy"
    >
      <View
        height={frame.width * 2}
        width={frame.width * 2}
        backgroundColor="red"
        position="absolute"
        borderRadius={600}
        overflow="hidden"
        transform={[{ translateY: -frame.width - 50 }, { translateX: -150 }]}
      >
        <LinearGradient
          flex={1}
          borderRadius="$4"
          colors={["$purple10", "$purple8"]}
          start={[1, 0]}
          end={[0, 1]}
        />
      </View>
      <SafeAreaView style={{ flex: 1 }}>
        <View paddingVertical="$3" paddingHorizontal="$4">
          <H6 color="white">Beacon flow</H6>
          <H4 color="white" textTransform="capitalize">
            {date.toLocaleDateString("fr-FR", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </H4>
        </View>
        <Card>
          <View flex={1} padding="$4">
            <H6 color="$purple8" fontWeight="900">
              BALANCE
            </H6>
            <H2 color="white">
              {Intl.NumberFormat("fr-FR", {
                style: "currency",
                currency: "EUR",
              }).format(123456.78)}
            </H2>
          </View>
        </Card>
      </SafeAreaView>
    </View>
  );
}
