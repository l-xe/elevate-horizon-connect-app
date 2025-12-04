import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import EventsScreen from "./screens/events";
import SettingsScreen from "./screens/settings";
import EventDetailsScreen from "./screens/event-details";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AppProvider, useAppSettings } from "./context/AppContext";

const EventsStack = createNativeStackNavigator();

function EventsStackScreen() {
  const { isDarkMode, textSize } = useAppSettings();

  return (
    <EventsStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: isDarkMode ? "#2a2a2a" : "#3CA6E5",
        },
        headerTitleStyle: {
          color: "#fff",
          fontSize: 18 * textSize,
        },
        headerTintColor: "#fff",
      }}
    >
      <EventsStack.Screen
        name="EventsList"
        component={EventsScreen}
        options={{ title: "Events" }}
      />
      <EventsStack.Screen
        name="EventDetails"
        component={EventDetailsScreen}
        options={{ title: "Event Details" }}
      />
    </EventsStack.Navigator>
  );
}

const MyTabs = createBottomTabNavigator({
  screenOptions: ({ route }) => {
    const { isDarkMode, textSize } = useAppSettings();

    return {
      tabBarIcon: ({ color, size }) => {
        let iconName;

        if (route.name === "Events") {
          iconName = "calendar";
        } else if (route.name === "Settings") {
          iconName = "settings";
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: "#3CA6E5",
      tabBarInactiveTintColor: "gray",
      headerShown: false,
      tabBarStyle: {
        backgroundColor: isDarkMode ? "#1a1a1a" : "#fff",
        borderTopColor: isDarkMode ? "#333" : "#ccc",
      },
    };
  },
  screens: {
    Events: {
      screen: EventsStackScreen,
      options: { title: "Events" },
    },
    Settings: SettingsScreen,
  },
});

const Navigation = createStaticNavigation(MyTabs);

export default function App() {
  return (
    <AppProvider>
      <SafeAreaProvider>
        <Navigation />
      </SafeAreaProvider>
    </AppProvider>
  );
}
