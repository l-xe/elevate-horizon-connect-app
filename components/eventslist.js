import { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import Card from "./card";
import { fetchEvents } from "../services/events";

export default function EventsList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents()
      .then((data) => setEvents(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <View>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card
            title={item.title}
            location={item.location}
            time={item.startTime}
            date={item.date}
            spotsRemaining={item.spotsRemaining}
          />
        )}
      />
    </View>
  );
}
