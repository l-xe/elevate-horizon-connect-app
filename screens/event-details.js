import { useState } from "react";
import { View, Text, ScrollView, StyleSheet, Alert } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useRoute, useNavigation } from "@react-navigation/native";
import moment from "moment";
import { useAppSettings } from "../context/AppContext";
import { registerForEvent } from "../services/registrations";

export default function EventDetailsScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { event } = route.params || {};
  const { isDarkMode, textSize } = useAppSettings();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const bgColor = isDarkMode ? "#1a1a1a" : "#fff";
  const textColor = isDarkMode ? "#fff" : "#000";
  const secondaryTextColor = isDarkMode ? "#bbb" : "#7a7a7a";

  if (!event) {
    return (
      <View style={[styles.container, { backgroundColor: bgColor }]}>
        <Text style={[styles.errorText, { color: textColor }]}>
          Event not found
        </Text>
      </View>
    );
  }

  const handleRegister = async () => {
    if (!userName.trim() || !userEmail.trim()) {
      Alert.alert("Validation Error", "Please fill in all fields");
      return;
    }

    if (!userEmail.includes("@")) {
      Alert.alert("Validation Error", "Please enter a valid email address");
      return;
    }

    setLoading(true);
    try {
      await registerForEvent(event.id, userName, userEmail);
      Alert.alert(
        "Success",
        `Registration successful for ${event.title.replace("REMOTE", "")}!`,
        [
          {
            text: "OK",
            onPress: () => {
              setUserName("");
              setUserEmail("");
              navigation.goBack();
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert("Error", "Failed to register. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: bgColor }]}
      contentContainerStyle={styles.scrollContent}
    >
      <View
        style={[
          styles.detailsSection,
          { backgroundColor: isDarkMode ? "#2a2a2a" : "#f7f7f7" },
        ]}
      >
        <Text
          style={[styles.title, { color: textColor, fontSize: 24 * textSize }]}
        >
          {event.title.replace("REMOTE", "")}
        </Text>

        <View style={styles.infoRow}>
          <Text
            style={[
              styles.label,
              { color: secondaryTextColor, fontSize: 14 * textSize },
            ]}
          >
            Date & Time
          </Text>
          <Text
            style={[
              styles.value,
              { color: textColor, fontSize: 16 * textSize },
            ]}
          >
            {moment(event.date, "YYYY-MM-DD").format("MMMM D, YYYY")}
          </Text>
          <Text
            style={[
              styles.value,
              { color: textColor, fontSize: 16 * textSize },
            ]}
          >
            {moment(event.startTime, "HH:mm").format("h:mm A")} -{" "}
            {moment(event.endTime, "HH:mm").format("h:mm A")}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text
            style={[
              styles.label,
              { color: secondaryTextColor, fontSize: 14 * textSize },
            ]}
          >
            Location
          </Text>
          <Text
            style={[
              styles.value,
              { color: textColor, fontSize: 16 * textSize },
            ]}
          >
            {event.location}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text
            style={[
              styles.label,
              { color: secondaryTextColor, fontSize: 14 * textSize },
            ]}
          >
            Category
          </Text>
          <Text
            style={[
              styles.value,
              { color: textColor, fontSize: 16 * textSize },
            ]}
          >
            {event.category}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text
            style={[
              styles.label,
              { color: secondaryTextColor, fontSize: 14 * textSize },
            ]}
          >
            Available Spots
          </Text>
          <Text
            style={[
              styles.value,
              { color: textColor, fontSize: 16 * textSize },
            ]}
          >
            {event.spotsRemaining} of {event.capacity}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text
            style={[
              styles.label,
              { color: secondaryTextColor, fontSize: 14 * textSize },
            ]}
          >
            Description
          </Text>
          <Text
            style={[
              styles.value,
              { color: textColor, fontSize: 14 * textSize },
            ]}
          >
            {event.description}
          </Text>
        </View>
      </View>

      <View
        style={[
          styles.formSection,
          { backgroundColor: isDarkMode ? "#2a2a2a" : "#f7f7f7" },
        ]}
      >
        <Text
          style={[
            styles.formTitle,
            { color: textColor, fontSize: 18 * textSize },
          ]}
        >
          Register for this Event
        </Text>

        <TextInput
          label="Full Name"
          value={userName}
          onChangeText={setUserName}
          style={styles.input}
          placeholderTextColor={secondaryTextColor}
          mode="outlined"
          editable={!loading}
        />

        <TextInput
          label="Email Address"
          value={userEmail}
          onChangeText={setUserEmail}
          keyboardType="email-address"
          style={styles.input}
          placeholderTextColor={secondaryTextColor}
          mode="outlined"
          editable={!loading}
        />

        <Button
          mode="contained"
          onPress={handleRegister}
          loading={loading}
          disabled={loading || event.spotsRemaining === 0}
          style={styles.registerBtn}
          buttonColor="#3CA6E5"
          textColor="#fff"
          labelStyle={{ fontSize: 16 * textSize }}
        >
          {loading ? "Registering..." : "Register Now"}
        </Button>

        {event.spotsRemaining === 0 && (
          <Text
            style={[
              styles.fullText,
              { color: "#d32f2f", fontSize: 14 * textSize },
            ]}
          >
            Sorry, this event is full
          </Text>
        )}
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
  },
  detailsSection: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  title: {
    fontWeight: "700",
    marginBottom: 16,
  },
  infoRow: {
    marginBottom: 16,
  },
  label: {
    fontWeight: "600",
    marginBottom: 4,
  },
  value: {
    marginBottom: 4,
    lineHeight: 24,
  },
  formSection: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  formTitle: {
    fontWeight: "700",
    marginBottom: 16,
  },
  input: {
    marginBottom: 12,
  },
  registerBtn: {
    marginTop: 16,
    paddingVertical: 8,
  },
  fullText: {
    textAlign: "center",
    marginTop: 12,
    fontWeight: "500",
  },
  errorText: {
    fontSize: 16,
    textAlign: "center",
  },
});
