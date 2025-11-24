import * as React from "react";
import { Text, View } from "react-native";
import {
  createStaticNavigation,
  useNavigation,
} from "@react-navigation/native";
import { Button } from "@react-navigation/elements";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "./screens/home";
import EventsScreen from "./screens/events";
import SettingsScreen from "./screens/settings";
import { SafeAreaProvider } from "react-native-safe-area-context";

const MyTabs = createBottomTabNavigator({
  screens: {
    Home: HomeScreen,
    Events: EventsScreen,
    Settings: SettingsScreen,
  },

  screenOptions: {
    headerStyle: {
      backgroundColor: "rgba(3, 154, 255, 1)", // header background
    },
    headerTintColor: "#fff", // header text & icons
  },
});

const Navigation = createStaticNavigation(MyTabs);

export default function App() {
  return (
    <SafeAreaProvider>
      <Navigation />
    </SafeAreaProvider>
  );
}
