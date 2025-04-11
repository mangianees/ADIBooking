import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";

const GetADIsScreen = () => {
  const [adis, setAdis] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [adisRes, availabilityRes] = await Promise.all([
          fetch("http://192.168.0.28:3000/"),
          fetch("http://192.168.0.28:3000/availability"),
        ]);

        if (!adisRes.ok || !availabilityRes.ok) {
          throw new Error("Failed to fetch data.");
        }

        const adisData = await adisRes.json();
        const availabilityData = await availabilityRes.json();

        console.log("✅ ADIs:", adisData);
        console.log("✅ Availability:", availabilityData);

        setAdis(Array.isArray(adisData) ? adisData : []);
        setAvailability(Array.isArray(availabilityData) ? availabilityData : []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const calculateFreeSlotsPercentage = (adiId) => {
    const adiIdStr = String(adiId);
    const slots = availability.filter(
      (slot) => String(slot.adi_id) === adiIdStr
    );

    if (slots.length === 0) {
      console.log(`⚠️ No slots found for ADI ${adiIdStr}`);
      return 0;
    }

    const freeSlots = slots.filter(
      (slot) => slot.is_booked === false || slot.is_booked === 0
    ).length;

    const percent = Math.floor((freeSlots / slots.length) * 100);
    console.log(
      `📊 ADI ${adiIdStr}: ${freeSlots} free out of ${slots.length} → ${percent}%`
    );
    return percent;
  };

  const getBackgroundColor = (percentage) => {
    if (percentage > 80) return "#32CD32"; // LimeGreen
    if (percentage > 60) return "#ADFF2F"; // GreenYellow
    if (percentage > 40) return "#FFD700"; // Gold
    if (percentage > 20) return "#FFA500"; // Orange
    return "#FF6347"; // Tomato (low availability)
  };

  const enrichedAdis = adis.map((adi) => {
    const percentage = calculateFreeSlotsPercentage(adi.id);
    return { ...adi, freeSlotsPercentage: percentage };
  });

  const sortedAdis = enrichedAdis.sort(
    (a, b) => b.freeSlotsPercentage - a.freeSlotsPercentage
  );

  const renderADI = ({ item }) => {
    const backgroundColor = getBackgroundColor(item.freeSlotsPercentage);
    return (
      <View style={[styles.card, { backgroundColor }]}>
        <Text style={styles.name}>
          Full Name: {item.first_name} {item.last_name}
        </Text>
        <Text style={styles.location}>Location: {item.location}</Text>
        <Text style={styles.freeSlots}>
          Free Availability: {item.freeSlotsPercentage}%
        </Text>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Approved Driving Instructors</Text>
      <FlatList
        data={sortedAdis}
        keyExtractor={(item, index) =>
          item?.id !== undefined ? item.id.toString() : index.toString()
        }
        renderItem={renderADI}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#F9F9F9",
    flex: 1,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  card: {
    padding: 15,
    marginBottom: 12,
    borderRadius: 10,
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  location: {
    fontSize: 16,
    color: "#000",
  },
  freeSlots: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default GetADIsScreen;
