import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator, FlatList } from "react-native";
import { Text, Card,Title,Paragraph } from "react-native-paper";
import { colors } from "../theme/colors";
const AvailabilityScreen = () => {
  const [availability, setAvailability] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://192.168.0.28:3000/availability")
      .then((response) => response.json())
      .then((data) => {
        setAvailability(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching availability:", error);
        setLoading(false);
      });
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toDateString(); // e.g., "Fri Apr 11 2025"
  };

  const renderAvailability = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Title style={styles.cardTextBold}>Date: {formatDate(item.date)}</Title>
        <Paragraph style={styles.cardText}>No: {item.id}</Paragraph>
        <Paragraph style={styles.cardText}>
          Time Slot: {item.time_slot}
        </Paragraph>
        <Paragraph style={styles.cardText}>ADI ID: {item.adi_id}</Paragraph>
        <Paragraph style={styles.cardText}>
          Status: {item.is_booked ? "Booked" : "Available"}
        </Paragraph>
      </Card.Content>
    </Card>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ADI Availability</Text>
      <FlatList
        data={availability}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderAvailability}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background, // Changed background color
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "Roboto",
    color: colors.font, // Changed font color
  },
  card: {
    backgroundColor: colors.background, // Changed background color
    marginBottom: 15,
    borderRadius: 10,
    elevation: 3,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
    fontFamily: "San Francisco",
    color: colors.font, // Changed font color
  },
  cardTextBold: {
    fontSize: 16,
    marginBottom: 5,
    fontFamily: "Open Sans",
    fontWeight: "bold",
    color: colors.font, // Changed font color
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AvailabilityScreen;
