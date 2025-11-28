import * as React from "react";
import { Text, View } from "react-native";
import {
  createStaticNavigation,
  useNavigation,
} from "@react-navigation/native";
import { Button } from "@react-navigation/elements";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { globalStyles } from "./styles/styles";

import EventsScreen from "./screens/events";
import SettingsScreen from "./screens/settings";

import { fetchEvents } from "./services/events";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";

const MyTabs = createBottomTabNavigator({
  screenOptions: ({ route }) => ({
    tabBarIcon: ({ color, size }) => {
      let iconName;

      if (route.name === 'Events') {
        iconName = "calendar"
      } else if (route.name === 'Settings') {
        iconName = "settings"
      }

      return <Ionicons name={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: 'tomato',
    tabBarInactiveTintColor: 'gray',
    headerStyle: {
      backgroundColor: "#28a9ffff",
    },
    headerTitleStyle: {
      color: "#ffffff"
    }

  }),
  screens: {
    Events: EventsScreen,
    Settings: SettingsScreen,
  },
});

const Navigation = createStaticNavigation(MyTabs);

export default function App() {
  return (
    <SafeAreaProvider >
      <Navigation />
    </SafeAreaProvider>
  );
}
