import { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import Card from "./card";
import { fetchEvents } from "../services/events";
import moment from "moment";

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
            time={moment(item.startTime, "HH:mm").format("h:mm A")}
            date={moment(item.date, "YYYY-MM-DD").fromNow()}
            spotsRemaining={item.spotsRemaining}
          />
        )}
      />
    </View>
  );
}
