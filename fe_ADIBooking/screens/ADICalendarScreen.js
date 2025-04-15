import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
} from "react-native";
import { Calendar } from "react-native-calendars";

const ADICalendarScreen = ({ route }) => {
  const { adi } = route.params;
  const [availability, setAvailability] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const response = await fetch("http://192.168.0.28:3000/availability");
        const data = await response.json();
        const filtered = data.filter(
          (slot) => slot.adi_id === adi.aid && !slot.is_booked
        );
        setAvailability(filtered);
      } catch (error) {
        console.error("Error fetching availability:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailability();
  }, [adi]);

  const availabilityByDate = availability.reduce((acc, slot) => {
    const date = slot.date.split("T")[0]; // ensure proper format
    if (!acc[date]) acc[date] = [];
    acc[date].push(slot);
    return acc;
  }, {});

  const markedDates = Object.keys(availabilityByDate).reduce((acc, date) => {
    acc[date] = { marked: true, dotColor: "green" };
    return acc;
  }, {});

  const slotsForSelectedDate =
    selectedDate && availabilityByDate[selectedDate]
      ? availabilityByDate[selectedDate]
      : [];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>
        Availability for {adi.first_name} {adi.last_name}
      </Text>

      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <>
          <Calendar
            onDayPress={(day) => setSelectedDate(day.dateString)}
            markedDates={{
              ...markedDates,
              ...(selectedDate && {
                [selectedDate]: {
                  selected: true,
                  marked: markedDates[selectedDate]?.marked,
                  selectedColor: "#007AFF",
                },
              }),
            }}
          />

          <Text style={styles.subheading}>
            {selectedDate
              ? `Available slots on ${selectedDate}:`
              : "Select a date to view available slots."}
          </Text>

          <FlatList
            data={slotsForSelectedDate}
            keyExtractor={(item, index) => `${item.adi_id}-${item.date}-${index}`}
            renderItem={({ item }) => (
              <View style={styles.slotCard}>
                <Text style={styles.slotText}>Time: {item.time}</Text>
              </View>
            )}
            ListEmptyComponent={
              selectedDate ? (
                <Text style={styles.noSlots}>No available slots.</Text>
              ) : null
            }
          />
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F9F9F9",
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  subheading: {
    fontSize: 18,
    marginVertical: 10,
  },
  slotCard: {
    padding: 12,
    marginVertical: 5,
    backgroundColor: "#e6f7ff",
    borderRadius: 8,
    borderColor: "#b3d9ff",
    borderWidth: 1,
  },
  slotText: {
    fontSize: 16,
    color: "#007AFF",
  },
  noSlots: {
    marginTop: 10,
    fontSize: 16,
    color: "#999",
    textAlign: "center",
  },
});

export default ADICalendarScreen;
