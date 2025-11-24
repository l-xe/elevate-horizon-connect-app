import * as React from "react";
import { Text, View } from "react-native";
import {
  createStaticNavigation,
  useNavigation,
} from "@react-navigation/native";
import { Button } from "@react-navigation/elements";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { globalStyles } from "./styles/styles";

import HomeScreen from "./screens/home";
import EventsScreen from "./screens/events";
import SettingsScreen from "./screens/settings";

import { fetchEvents } from "./services/events";
import { SafeAreaProvider } from "react-native-safe-area-context";
console.log(fetchEvents());
const MyTabs = createBottomTabNavigator({
  screens: {
    Home: HomeScreen,
    Events: EventsScreen,
    Settings: SettingsScreen,
  },

  screenOptions: {
    headerStyle: {
      backgroundColor: "#039AFF", // header background
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
