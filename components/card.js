import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { globalStyles } from "../styles/styles";
import { Pressable } from "react-native";

export default function Card(props) {
  return (
    <Pressable>
      <View style={globalStyles.card}>
        <Text style={globalStyles.header}>
          {props.title.replace("REMOTE", "")}
        </Text>
        <Text style={globalStyles.caption}>
          {props.time} {props.date}
        </Text>
        <Text style={globalStyles.caption}>{props.location}</Text>
        <Text style={globalStyles.caption}>{props.spotsRemaining} going</Text>
      </View>
    </Pressable>
  );
}
