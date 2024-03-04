import { useRouter } from "expo-router";
import { useRef } from "react";
import { Dimensions } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import Animated, { LinearTransition } from "react-native-reanimated";
import { Circle, H6, Text, View, XStack, YStack } from "tamagui";

import { Button } from "./Button";
import { AddRecurrentExpenseModal } from "./EnterRecurrentExpenseModal";
import { ArrowLeft } from "./icons/ArrowLeft";
import { ArrowRight } from "./icons/ArrowRight";
import { i18n } from "../lib/i18n";
import { DatabaseService } from "../services/DatabaseService";
import { useRecurringExpenses } from "../stores/recurring-expenses";
import { RecurrentExpense } from "../types";

const { width } = Dimensions.get("window");
export function EnterRecurrentExpenses() {
  const addExpenseModalRef = useRef<{
    present: () => void;
  }>(null);
  const router = useRouter();
  const [expenses, setExpenses] = useRecurringExpenses((store) => [
    store.expenses,
    store.setExpenses,
  ]);
  const amountOfExpenses = expenses.reduce(
    (acc, expense) => acc + expense.amount,
    0,
  );

  const handlePrevStep = () => {
    router.setParams({ step: "1" });
  };

  const handleNextStep = () => {
    DatabaseService.shared.addRecurrentExpenses(expenses);
    router.setParams({ step: "3" });
  };

  const handleAddExpense = () => {
    addExpenseModalRef.current?.present();
  };

  const handleExpenseAdded = (expense: RecurrentExpense) => {
    setExpenses([...expenses, expense]);
  };

  const handleRemoveExpense = (id: number) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const renderItem = ({ item }: { item: RecurrentExpense }) => {
    return <Expense item={item} onRemove={handleRemoveExpense} />;
  };

  return (
    <>
      <View width={width} paddingHorizontal="$4" flex={1}>
        <XStack alignItems="center">
          <Button
            size="$2"
            marginRight="$2"
            backgroundColor="white"
            onPress={handlePrevStep}
          >
            <ArrowLeft />
          </Button>
          <H6>{i18n.t("onboarding.recurrentExpenses.label")}</H6>
        </XStack>
        <Animated.FlatList
          data={expenses}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          style={{ flex: 1 }}
          contentContainerStyle={{ flex: 1 }}
          itemLayoutAnimation={LinearTransition}
          ListEmptyComponent={
            <Empty onOpenAddExpenseModal={handleAddExpense} />
          }
          ListHeaderComponent={
            amountOfExpenses > 0 ? (
              <Header amount={amountOfExpenses} onNextStep={handleNextStep} />
            ) : null
          }
        />
        {expenses.length > 0 && (
          <Button marginBottom="$4" onPress={handleAddExpense}>
            <Text color="$purple10" fontWeight="900">
              {i18n.t("onboarding.recurrentExpenses.addExpense")}
            </Text>
          </Button>
        )}
      </View>
      <AddRecurrentExpenseModal
        ref={addExpenseModalRef}
        onAdd={handleExpenseAdded}
      />
    </>
  );
}

type HeaderProps = {
  amount: number;
  onNextStep: () => void;
};

function Header({ amount, onNextStep }: HeaderProps) {
  return (
    <XStack justifyContent="space-between" alignItems="center">
      <Text
        fontSize="$10"
        marginVertical="$4"
        fontWeight="900"
        color="$purple8"
      >
        {amount}€
      </Text>
      <Button size="$4" onPress={onNextStep}>
        <ArrowRight />
      </Button>
    </XStack>
  );
}

type EmptyProps = {
  onOpenAddExpenseModal: () => void;
};

function Empty({ onOpenAddExpenseModal }: EmptyProps) {
  return (
    <YStack
      margin="auto"
      width="85%"
      enterStyle={{
        opacity: 0,
      }}
      opacity={1}
      animation="lazy"
    >
      <Text textAlign="center" fontSize="$10">
        💭
      </Text>
      <Text textAlign="center" color="$gray10">
        {i18n.t("onboarding.recurrentExpenses.hint")}
      </Text>
      <Button
        mt="$4"
        marginHorizontal="auto"
        theme="purple"
        onPress={onOpenAddExpenseModal}
      >
        <Text color="$purple10" fontWeight="900">
          {i18n.t("onboarding.recurrentExpenses.addExpense")}
        </Text>
      </Button>
    </YStack>
  );
}

type Props = {
  item: RecurrentExpense;
  onRemove: (id: number) => void;
};

function Expense({ item, onRemove }: Props) {
  const handleRemove = () => {
    onRemove(item.id);
  };

  const renderLeftActions = () => {
    return (
      <Button theme="red" borderRadius="$0" onPress={handleRemove}>
        <Text color="$red10">
          {i18n.t("onboarding.recurrentExpenses.delete")}
        </Text>
      </Button>
    );
  };

  return (
    <Swipeable renderRightActions={renderLeftActions}>
      <XStack
        alignItems="center"
        marginBottom="$2"
        backgroundColor="white"
        p="$2"
      >
        <Circle size="$3" backgroundColor="$purple5">
          <Text>{i18n.t(`expenseLabelEmoji.${item.label}`)}</Text>
        </Circle>
        <Text marginLeft="$2">{item.name}</Text>
        <Text marginLeft="auto">{item.amount}€</Text>
      </XStack>
    </Swipeable>
  );
}
