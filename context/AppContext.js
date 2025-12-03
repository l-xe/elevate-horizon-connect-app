import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [textSize, setTextSize] = useState(1); // 1 = normal, 1.2 = large, 1.4 = extra large
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Load settings from AsyncStorage on mount
  useEffect(() => {
    loadSettings();
  }, []);

  // Save settings to AsyncStorage whenever they change
  useEffect(() => {
    saveSettings();
  }, [isDarkMode, textSize, soundEnabled]);

  const loadSettings = async () => {
    try {
      const settings = await AsyncStorage.getItem("appSettings");
      if (settings) {
        const { darkMode, fontSize, sound } = JSON.parse(settings);
        setIsDarkMode(darkMode ?? false);
        setTextSize(fontSize ?? 1);
        setSoundEnabled(sound ?? true);
      }
    } catch (error) {
      console.error("Error loading settings:", error);
    }
  };

  const saveSettings = async () => {
    try {
      await AsyncStorage.setItem(
        "appSettings",
        JSON.stringify({
          darkMode: isDarkMode,
          fontSize: textSize,
          sound: soundEnabled,
        })
      );
    } catch (error) {
      console.error("Error saving settings:", error);
    }
  };

  const value = {
    isDarkMode,
    setIsDarkMode,
    textSize,
    setTextSize,
    soundEnabled,
    setSoundEnabled,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppSettings = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppSettings must be used within AppProvider");
  }
  return context;
};
