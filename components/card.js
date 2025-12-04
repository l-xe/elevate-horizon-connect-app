import { Text, View } from "react-native";
import { globalStyles } from "../styles/styles";
import { Pressable } from "react-native";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import { useAppSettings } from "../context/AppContext";

export default function Card(props) {
  const navigation = useNavigation();
  const { isDarkMode, textSize } = useAppSettings();

  const bgColor = isDarkMode ? "#2a2a2a" : "#fff";
  const textColor = isDarkMode ? "#fff" : "#000";
  const secondaryTextColor = isDarkMode ? "#bbb" : "#7a7a7a";

  const handlePress = () => {
    navigation.navigate("EventDetails", { event: props.event });
  };

  return (
    <Pressable onPress={handlePress}>
      <View style={[globalStyles.card, { backgroundColor: bgColor }]}>
        <Text
          style={[
            globalStyles.header,
            { color: textColor, fontSize: 20 * textSize },
          ]}
        >
          {props.title.replace("REMOTE", "")}
        </Text>
        <Text
          style={[
            globalStyles.caption,
            { color: secondaryTextColor, fontSize: 14 * textSize },
          ]}
        >
          {moment(props.time, "HH:mm").format("h:mm A")}{" "}
          {moment(props.date, "YYYY-MM-DD").fromNow()}
        </Text>
        <Text
          style={[
            globalStyles.caption,
            { color: secondaryTextColor, fontSize: 14 * textSize },
          ]}
        >
          {props.location}
        </Text>
        <Text
          style={[
            globalStyles.caption,
            { color: secondaryTextColor, fontSize: 14 * textSize },
          ]}
        >
          {props.spotsRemaining} spots available
        </Text>
      </View>
    </Pressable>
  );
}
