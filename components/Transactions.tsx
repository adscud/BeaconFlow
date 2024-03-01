import { FlashList } from "@shopify/flash-list";
import { Text, View, XStack, YStack } from "tamagui";

import { i18n } from "../lib/i18n";
import { Transaction } from "../types";

type Props = {
  data: (string | Transaction)[];
};

export function Transactions({ data }: Props) {
  return (
    <View zIndex={-1} flex={1} marginHorizontal="$4">
      <FlashList
        contentContainerStyle={{
          paddingTop: 32,
        }}
        data={data}
        renderItem={({ item }: { item: Transaction | string }) => {
          if (typeof item === "string") {
            return <RenderDate item={item} />;
          } else {
            return <RenderTransaction item={item} />;
          }
        }}
        getItemType={(item) => {
          return typeof item === "string" ? "sectionHeader" : "row";
        }}
        estimatedItemSize={40}
      />
    </View>
  );
}

function RenderDate({ item }: { item: string }) {
  const date = new Date(item);

  return (
    <Text color="$gray8" textTransform="capitalize">
      {date.toLocaleDateString("fr-FR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })}
    </Text>
  );
}

function RenderTransaction({ item }: { item: Transaction }) {
  return (
    <XStack
      height="$4"
      alignItems="center"
      justifyContent="space-between"
      paddingHorizontal="$2"
    >
      <YStack>
        <Text>
          {item.type === "initial"
            ? i18n.t("transactions.initialBalance")
            : item.name}
        </Text>
        {item.description && <Text>{item.description}</Text>}
      </YStack>
      <Text
        color={
          ["income", "initial"].includes(item.type) ? "$green10" : "$red10"
        }
      >
        {["income", "initial"].includes(item.type) ? "+" : "-"}
        {item.amount}
      </Text>
    </XStack>
  );
}
