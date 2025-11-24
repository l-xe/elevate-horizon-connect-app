import * as React from 'react';
import { Text, View } from 'react-native';
import { createStaticNavigation, useNavigation, } from '@react-navigation/native';
import { Button } from '@react-navigation/elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import HomeScreen from './screens/home'
import EventsScreen from './screens/events'
import SettingsScreen from './screens/settings'

const MyTabs = createBottomTabNavigator({
  screens: {
    Home: HomeScreen,
    Events: EventsScreen,
    Settings: SettingsScreen
  },

  screenOptions: {
    headerStyle: {
      backgroundColor: '#4a90e2', // header background
    },
    headerTintColor: '#fff', // header text & icons
  }
});

const Navigation = createStaticNavigation(MyTabs);

export default function App() {
  return <Navigation />;
}
