import { LinearGradient } from "@tamagui/linear-gradient";
import { SafeAreaView, useSafeAreaFrame } from "react-native-safe-area-context";
import { Button, H2, H4, H6, Paragraph, View } from "tamagui";

import { Card } from "../components/Card";
import { Plus } from "../components/icons/Plus";
import { i18n } from "../lib/i18n";

export default function Page() {
  const frame = useSafeAreaFrame();
  const date = new Date();
  const balance = 0;

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
          <View
            flex={1}
            padding="$4"
            alignItems={!balance ? "center" : "flex-start"}
            justifyContent={!balance ? "center" : "space-between"}
          >
            <H6 color="$purple8" fontWeight="900">
              {i18n.t("balance")}
            </H6>
            <H2 color={!balance ? "$purple8" : "white"}>
              {Intl.NumberFormat("fr-FR", {
                style: "currency",
                currency: "EUR",
              }).format(balance)}
            </H2>
            {!balance && (
              <Button
                backgroundColor="$purple10"
                borderColor="$purple10"
                animation="lazy"
                transform={[{ scale: 1 }]}
                pressStyle={{
                  backgroundColor: "$purple9",
                  borderColor: "$purple9",
                  transform: [{ scale: 0.95 }],
                }}
                color="white"
              >
                <Plus />
                {i18n.t("addBalance")}
              </Button>
            )}
          </View>
        </Card>
        {!balance && (
          <View m="auto" zIndex={-1}>
            <Paragraph textAlign="center" color="$gray10">
              {i18n.t("welcome")}
            </Paragraph>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
}
