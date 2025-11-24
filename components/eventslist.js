import { View, Text, FlatList } from "react-native";
import Card from "./card";
import { fetchEvents } from "../services/events";

const dummyData = fetchEvents();

export default function EventsList() {
  return (
    <View>
      <FlatList
        data={dummyData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card
            title={item.title}
            location={item.location}
            endTime={item.endTime}
            spotsRemaining={item.spotsRemaining}
          />
        )}
      />
    </View>
  );
}
