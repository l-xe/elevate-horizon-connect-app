import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button} from "@react-navigation/elements";
import { useAppSettings } from "../context/AppContext";
import { Switch } from "react-native-paper";
import Slider from "@react-native-community/slider";

export default function SettingsScreen() {
  const navigation = useNavigation();
  const {
    isDarkMode,
    setIsDarkMode,
    textSize,
    setTextSize,
    soundEnabled,
    setSoundEnabled,
  } = useAppSettings();

  const bgColor = isDarkMode ? "#1a1a1a" : "#fff";
  const textColor = isDarkMode ? "#fff" : "#000";
  const secondaryBg = isDarkMode ? "#2a2a2a" : "#f7f7f7";
  const secondaryTextColor = isDarkMode ? "#bbb" : "#7a7a7a";

  const fontSizeLabel =
    textSize === 1
      ? "Small"
      : textSize === 1.1
      ? "Default"
      : textSize === 1.2
      ? "Large"
      : "Extra Large";

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: bgColor }]}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: textColor, fontSize: 20 }]}>
          Accessibility
        </Text>

        {/* Text Size Slider */}
        <View
          style={[
            styles.settingItem,
            { backgroundColor: secondaryBg, borderRadius: 12 },
          ]}
        >
          <View style={styles.labelRow}>
            <Text
              style={[
                styles.label,
                { color: textColor, fontSize: 16 * textSize },
              ]}
            >
              Text Size
            </Text>
            <Text
              style={[
                styles.value,
                { color: "#3CA6E5", fontSize: 14 * textSize },
              ]}
            >
              {fontSizeLabel}
            </Text>
          </View>

          <View style={styles.sliderContainer}>
            <Text style={[styles.sizeLabel, { color: secondaryTextColor }]}>
              A
            </Text>
            <Slider
              style={styles.slider}
              value={textSize}
              onValueChange={setTextSize}
              minimumValue={1}
              maximumValue={1.3}
              step={0.1}
              minimumTrackTintColor="#3CA6E5"
              maximumTrackTintColor={isDarkMode ? "#444" : "#ddd"}
              // StepMarker={(props) => {
              //   return (
              //     <View>
              //       <Text>{props.index}</Text>
              //     </View>
              //   );
              // }}
            />
            <Text
              style={[
                styles.sizeLabel,
                { color: secondaryTextColor, fontSize: 20 },
              ]}
            >
              A
            </Text>
          </View>
        </View>

        {/* Dark Mode Toggle */}
        <View
          style={[
            styles.settingItem,
            { backgroundColor: secondaryBg, borderRadius: 12, marginTop: 12 },
          ]}
        >
          <View style={styles.labelRow}>
            <Text
              style={[
                styles.label,
                { color: textColor, fontSize: 16 * textSize },
              ]}
            >
              Dark Mode
            </Text>
            <Switch
              value={isDarkMode}
              onValueChange={setIsDarkMode}
              trackColor={{ false: "#ccc", true: "#3CA6E5" }}
              thumbColor={isDarkMode ? "#3CA6E5" : "#f4f3f4"}
            />
          </View>
        </View>

        {/* Sound Toggle */}
        <View
          style={[
            styles.settingItem,
            { backgroundColor: secondaryBg, borderRadius: 12, marginTop: 12 },
          ]}
        >
          <View style={styles.labelRow}>
            <Text
              style={[
                styles.label,
                { color: textColor, fontSize: 16 * textSize },
              ]}
            >
              Sound Effects
            </Text>
            <Switch
              value={soundEnabled}
              onValueChange={setSoundEnabled}
              trackColor={{ false: "#ccc", true: "#3CA6E5" }}
              thumbColor={soundEnabled ? "#3CA6E5" : "#f4f3f4"}
            />
          </View>
        </View>
      </View>

      {/* Info Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: textColor, fontSize: 20 }]}>
          About
        </Text>
        <View
          style={[
            styles.infoBox,
            { backgroundColor: secondaryBg, borderRadius: 12 },
          ]}
        >
          <Image
            source={require('../assets/Logo.jpg')}
          ></Image>
          <Text
            style={[
              styles.infoText,
              { color: textColor, fontSize: 14 * textSize },
            ]}
          >
            Elevate Horizon Connect v1.0
          </Text>
          <Text
            style={[
              styles.infoText,
              { color: secondaryTextColor, fontSize: 12 * textSize },
            ]}
          >
            Community engagement made easy
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontWeight: "700",
    marginBottom: 12,
  },
  settingItem: {
    padding: 16,
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  label: {
    fontWeight: "600",
  },
  value: {
    fontWeight: "500",
  },
  sliderContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  slider: {
    flex: 1,
    height: 40,
  },
  sizeLabel: {
    fontSize: 14,
    fontWeight: "500",
  },
  infoBox: {
    padding: 16,
  },
  infoText: {
    marginBottom: 4,
  },
});
