import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

const AvailabilityScreen = () => {
  const [availability, setAvailability] = useState([]);

  useEffect(() => {
    fetch("http://192.168.0.28:3000/availability")
      .then((response) => response.json())
      .then((data) => setAvailability(data))
      .catch((error) => console.error("Error fetching availability:", error));
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toDateString(); // e.g., "Fri Apr 11 2025"
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ADI Availability</Text>
      <FlatList
        data={availability}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardText}>No: {item.id}</Text>
            <Text style={styles.cardTextBold}>Date: {formatDate(item.date)}</Text>
            <Text style={styles.cardText}>Time Slot: {item.time_slot}</Text>
            <Text style={styles.cardText}>ADI ID: {item.adi_id}</Text>
            <Text style={styles.cardText}>
              Status: {item.is_booked ? "Booked" : "Available"}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "Roboto",
  },
  card: {
    backgroundColor: "#396d2f",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
    fontFamily: "San Francisco",
  },
  cardTextBold: {
    fontSize: 16,
    marginBottom: 5,
    fontFamily: "Open Sans",
    fontWeight: "bold",
  },
});

export default AvailabilityScreen;
