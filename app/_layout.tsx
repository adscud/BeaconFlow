import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Slot, SplashScreen } from "expo-router";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { TamaguiProvider } from "tamagui";

import "../tamagui-web.css";
import { db } from "../lib/database";
import { DatabaseService } from "../services/DatabaseService";
import { useAppStore } from "../stores/app";
import { useRecurringExpensesStore } from "../stores/recurring-expenses";
import { useSettingsStore } from "../stores/settings";
import { useTransactionsStore } from "../stores/transactions";
import { config } from "../tamagui.config";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loading, setLoading] = useAppStore((store) => [
    store.loading,
    store.setLoading,
  ]);
  const [setSettings] = useSettingsStore((store) => [store.setSettings]);
  const [setExpenses] = useRecurringExpensesStore((store) => [
    store.setExpenses,
  ]);
  const [setTransactions] = useTransactionsStore((store) => [
    store.setTransactions,
  ]);

  const [interLoaded, interError] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  useEffect(() => {
    DatabaseService.shared.init();
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM settings LIMIT 1`,
        [],
        (_, { rows }) => {
          const settings = rows.item(0);
          if (settings) {
            setSettings(settings);
          }

          tx.executeSql(
            `SELECT * FROM recurrentExpenses`,
            [],
            (_, { rows }) => {
              setExpenses(rows._array);
              setLoading(false);
            },
          );

          tx.executeSql(
            `SELECT * FROM transactions LIMIT 3`,
            [],
            (_, { rows }) => {
              const transactions = rows._array;
              setTransactions(transactions);
            },
          );
        },
        (_, error) => {
          console.error("Error fetching settings", error);
          return true;
        },
      );
    });
  }, []);

  useEffect(() => {
    if ((interLoaded || interError) && loading) {
      // Hide the splash screen after the fonts have loaded (or an error was returned) and the UI is ready.
      SplashScreen.hideAsync();
    }
  }, [interLoaded, interError, loading]);

  if ((!interLoaded && !interError) || loading) {
    return null;
  }

  return <RootLayoutNav />;
}

export const unstable_settings = {
  initialRouteName: "(ready)",
};

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TamaguiProvider config={config} defaultTheme={colorScheme as any}>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Slot />
        </ThemeProvider>
      </TamaguiProvider>
    </GestureHandlerRootView>
  );
}
