import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { globalStyles } from "../styles/styles";
import { Pressable } from "react-native";

export default function Card(props) {
  return (
    <Pressable>
      <View style={globalStyles.card}>
        <Text style={globalStyles.header}>{props.title}</Text>
        <Text>
          {new Date(props.endTime).toLocaleString("en-GB", {
            day: "numeric",
            month: "short",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}
        </Text>
        <Text>{props.location}</Text>
        <Text>{props.spotsRemaining}</Text>
      </View>
    </Pressable>
  );
}
