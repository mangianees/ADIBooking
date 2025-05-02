import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { colors } from "../theme/colors";

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
    const date = slot.date.split("T")[0];
    if (!acc[date]) acc[date] = [];
    acc[date].push(slot);
    return acc;
  }, {});

  const markedDates = Object.keys(availabilityByDate).reduce((acc, date) => {
    acc[date] = {
      marked: true,
      dotColor: "green",
    };
    return acc;
  }, {});

  if (selectedDate) {
    markedDates[selectedDate] = {
      ...markedDates[selectedDate],
      selected: true,
      selectedColor: "#007AFF",
    };
  }

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
  onDayPress={(day) => {
    setSelectedDate(day.dateString);
  }}
  markedDates={{
    ...(selectedDate && {
      [selectedDate]: {
        selected: true,
        selectedColor: "#007AFF",
      },
    }),
  }}
  markingType="custom"
  theme={{
    backgroundColor: "#F9F9F9",
    calendarBackground: "#F9F9F9",
    textSectionTitleColor: "#888",
    selectedDayBackgroundColor: "#007AFF",
    selectedDayTextColor: "#ffffff",
    todayTextColor: "#007AFF",
    dayTextColor: "#333",
    textDisabledColor: "#d9e1e8",
    arrowColor: "#ffffff",
    monthTextColor: "#ffffff",
    textMonthFontWeight: "bold",
    textMonthFontSize: 18,
    textDayFontWeight: "500",
    textDayHeaderFontWeight: "600",
    textDayHeaderFontSize: 14,
  }}
  style={styles.calendarStyle}
  dayComponent={({ date, state }) => {
    const slots = availabilityByDate[date.dateString];
    const isSelected = selectedDate === date.dateString;

    return (
      <TouchableOpacity onPress={() => setSelectedDate(date.dateString)}>
        <View style={{ alignItems: "center", paddingVertical: 6 }}>
          <Text
            style={{
              color:
                state === "disabled"
                  ? "#ccc"
                  : isSelected
                  ? "white"
                  : "#333",
              backgroundColor: isSelected ? "#007AFF" : "transparent",
              borderRadius: 16,
              width: 32,
              height: 32,
              textAlign: "center",
              lineHeight: 32,
              fontWeight: "500",
            }}
          >
            {date.day}
          </Text>
          {slots && (
            <View
              style={{
                marginTop: 4,
                backgroundColor: "#007AFF",
                borderRadius: 10,
                paddingHorizontal: 6,
              }}
            >
              <Text style={{ fontSize: 10, color: "white" }}>
                {slots.length}
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  }}
/>

          <Text style={styles.subheading}>
            {selectedDate
              ? `Available slots on ${selectedDate}:`
              : "Select a date to view available slots."}
          </Text>

          <FlatList
            data={slotsForSelectedDate}
            keyExtractor={(item, index) =>
              `${item.adi_id}-${item.date}-${index}`
            }
            renderItem={({ item }) => (
              <View style={styles.slotCard}>
                <Text style={styles.slotText}>Time: {item.time_slot}</Text>
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
  calendarStyle: {
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 10,
    elevation: 2,
    backgroundColor: colors.background, // Header background color
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
