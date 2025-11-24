import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { globalStyles } from "../styles/styles";
import { Pressable } from "react-native";
import moment from "moment";

export default function Card(props) {
  return (
    <Pressable>
      <View style={globalStyles.card}>
        <Text style={globalStyles.header}>
          {props.title.replace("REMOTE", "")}
        </Text>
        <Text style={globalStyles.caption}>
          {moment(props.time, "HH:mm").format("h:mm A")}{" "}
          {moment(props.date, "YYYY-MM-DD").fromNow()}
        </Text>
        <Text style={globalStyles.caption}>{props.location}</Text>
        <Text style={globalStyles.caption}>{props.spotsRemaining} going</Text>
      </View>
    </Pressable>
  );
}
