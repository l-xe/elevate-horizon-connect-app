import { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, RefreshControl } from "react-native";
import { Button } from "react-native-paper";
import { fetchEvents } from "../services/events.js";
import Card from "../components/card.js";
import SearchBar from "../components/search-bar.js";
import { useAppSettings } from "../context/AppContext.js";

export default function EventsScreen() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const { isDarkMode, textSize } = useAppSettings();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEvents();
  }, []);

  useEffect(() => {
    filterEvents();
  }, [searchQuery, selectedCategory, events]);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const data = await fetchEvents();

      setEvents(data);
      setFilteredEvents(data);
      setLoading(false);

      const uniqueCategories = [
        "All",
        ...Array.from(new Set(data.map((event) => event.category))),
      ];

      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const filterEvents = () => {
    let filtered = events;

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (event) => event.category === selectedCategory
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(query) ||
          event.location.toLowerCase().includes(query) ||
          event.description.toLowerCase().includes(query)
      );
    }

    setFilteredEvents(filtered);
  };

  const filterByCategory = (category) => {
    setSelectedCategory(category);
  };

  const bgColor = isDarkMode ? "#1a1a1a" : "#fff";
  const textColor = isDarkMode ? "#fff" : "#000";

  const renderEvent = ({ item }) => (
    <Card
      title={item.title}
      location={item.location}
      spotsRemaining={item.spotsRemaining}
      date={item.date}
      time={item.startTime}
      event={item}
    />
  );

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search events..."
      />

      <View style={styles.categoriesRow}>
        {categories.map((cat) => (
          <Button
            mode={selectedCategory === cat ? "contained" : "outlined"}
            buttonColor={selectedCategory === cat ? "#3CA6E5" : undefined}
            textColor={selectedCategory === cat ? "#FFFFFF" : "#3CA6E5"}
            style={styles.categoryBtn}
            onPress={() => filterByCategory(cat)}
            key={cat}
            labelStyle={{ fontSize: 12 * textSize }}
          >
            {cat}
          </Button>
        ))}
      </View>

      <FlatList
        data={filteredEvents}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderEvent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: textColor }]}>
              No events found
            </Text>
          </View>
        }
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={loadEvents} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  categoriesRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 12,
    gap: 4,
  },
  categoryBtn: {
    margin: 2,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
  },
});
