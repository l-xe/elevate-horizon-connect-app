import { View, StyleSheet } from "react-native";
import { Searchbar as RNPSearchbar } from "react-native-paper";
import { useAppSettings } from "../context/AppContext.js";

export default function SearchBar({
  value,
  onChangeText,
  placeholder = "Search events...",
}) {
  const { isDarkMode, textSize } = useAppSettings();

  const bgColor = isDarkMode ? "#2a2a2a" : "#f5f5f5";
  const textColor = isDarkMode ? "#fff" : "#000";
  const placeholderColor = isDarkMode ? "#888" : "#999";

  return (
    <View style={styles.container}>
      <RNPSearchbar
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        style={[
          styles.searchBar,
          {
            backgroundColor: bgColor,
            color: textColor,
            fontSize: 14 * textSize,
          },
        ]}
        placeholderTextColor={placeholderColor}
        iconColor="#3CA6E5"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  searchBar: {
    borderRadius: 8,
  },
});
