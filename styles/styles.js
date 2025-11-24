import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  header: {
    fontSize: 30,
  },
  screen: {
    backgroundColor: "#F2F4F7",
    flex: 1,
  },
  card: {
    backgroundColor: "white",
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
});
