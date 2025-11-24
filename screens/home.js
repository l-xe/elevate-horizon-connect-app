import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button } from "@react-navigation/elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../styles/styles";
import { ScrollView } from "react-native";

export default function HomeScreen() {
  const navigation = useNavigation();

  return <SafeAreaView style={globalStyles.screen}></SafeAreaView>;
}
