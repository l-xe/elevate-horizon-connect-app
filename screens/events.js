import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { fetchEvents } from "../services/events";
import Card from "../components/card";

export default function EventsScreen() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const data = await fetchEvents();

      setEvents(data);
      setFilteredEvents(data);

      // Extract unique categories
      const uniqueCategories = [
        "All",
        ...Array.from(new Set(data.map((event) => event.category))),
      ];

      setCategories(uniqueCategories);

    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const filterByCategory = (category) => {
    setSelectedCategory(category);

    if (category === "All") {
      setFilteredEvents(events);
    } else {
      const filtered = events.filter((event) => event.category === category);
      setFilteredEvents(filtered);
    }
  };

  const renderEvent = ({ item }) => (
    <Card 
      title={item.title}
      location={item.location}
      spotsRemaining={item.spotsRemaining}
      date={item.date}
      time={item.startTime}
    ></Card>
  );

  return (
    <View style={styles.container}>

      <View style={styles.categoriesRow}>
        {categories.map((cat) => (
        <Button
          mode={selectedCategory === cat ? "contained" : "outlined"}
          buttonColor={selectedCategory === cat ? "#28a9ffff" : undefined}
          textColor={selectedCategory === cat ? "#FFFFFF" : "#28a9ffff"}
          style={styles.categoryBtn}
          onPress={() => filterByCategory(cat)}
        >
          {cat}
        </Button>
        ))}
      </View>

      <FlatList
        data={filteredEvents}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderEvent}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  categoriesRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 12,
    gap: 4,
  },
  categoryBtn: {
    margin: 2,
    color: "#000"
  },
  card: {
    backgroundColor: "#f7f7f7",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  categoryTag: {
    marginTop: 5,
    fontStyle: "italic",
    color: "#555",
  },
});
