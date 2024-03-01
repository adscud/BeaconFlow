import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "@tamagui/linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { H4, Text, XStack } from "tamagui";

import { Card } from "../components/Card";

export default function Page() {
  const date = new Date();

  return (
    <LinearGradient
      flex={1}
      borderRadius="$4"
      colors={["$purple5", "$purple2"]}
      start={[0, 0]}
      end={[1, 1]}
      enterStyle={{
        opacity: 0,
      }}
      animation="lazy"
    >
      <SafeAreaView style={{ flex: 1 }}>
        <XStack padding="$4" justifyContent="space-between" alignItems="center">
          <MaskedView
            style={{
              height: "100%",
              flex: 1,
            }}
            maskElement={<H4>BeaconFlow</H4>}
          >
            <LinearGradient
              colors={["$purple10", "$purple2"]}
              start={[0, 0]}
              end={[1, 1]}
            >
              <H4 opacity={0}>BeaconFlow</H4>
            </LinearGradient>
          </MaskedView>

          <Text color="$gray10">{date.toDateString()}</Text>
        </XStack>

        <Card />
      </SafeAreaView>
    </LinearGradient>
  );
}
