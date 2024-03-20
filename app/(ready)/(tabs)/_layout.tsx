import { Tabs } from "expo-router";
import { LucideHome } from "lucide-react-native";

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#8803fc",
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => <LucideHome size={16} color={color} />,
        }}
      />
    </Tabs>
  );
}
