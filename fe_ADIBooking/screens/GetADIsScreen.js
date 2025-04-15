import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

const GetADIsScreen = ({ navigation }) => {
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

        const adisData = await adisRes.json();
        const availabilityData = await availabilityRes.json();

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
    const slots = availability.filter((slot) => slot.adi_id === adiId);
    if (slots.length === 0) return 0;
    const freeSlots = slots.filter((slot) => !slot.is_booked).length;
    return Math.floor((freeSlots / slots.length) * 100);
  };

  const enrichedAdis = adis.map((adi) => ({
    ...adi,
    freeSlotsPercentage: calculateFreeSlotsPercentage(adi.aid),
  }));

  const sortedAdis = enrichedAdis.sort((a, b) => b.freeSlotsPercentage - a.freeSlotsPercentage);

  const getBarColor = (percentage) => {
    if (percentage > 80) return "#32CD32";
    if (percentage > 60) return "#ADFF2F";
    if (percentage > 40) return "#FFD700";
    if (percentage > 20) return "#FFA500";
    if (percentage > 0) return "#FF6347";
    return "#ff1919";
  };

  const renderADI = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate("ADICalendar", { adi: item })}>
      <View style={styles.card}>
        <Text style={styles.name}>
          {item.first_name} {item.last_name}
        </Text>
        <Text style={styles.location}>Location: {item.location}</Text>
        <View style={styles.barContainer}>
          <View
            style={[
              styles.barFill,
              {
                width: `${item.freeSlotsPercentage}%`,
                backgroundColor: getBarColor(item.freeSlotsPercentage),
              },
            ]}
          />
        </View>
        <Text style={styles.freeSlots}>
          Free Slots: {item.freeSlotsPercentage}%
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Available ADIs</Text>
      <FlatList
        data={sortedAdis}
        keyExtractor={(item, index) => item.aid?.toString() || index.toString()}
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
    backgroundColor: "#fff",
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
  },
  location: {
    fontSize: 16,
    color: "#000",
  },
  barContainer: {
    height: 12,
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 8,
    marginBottom: 6,
  },
  barFill: {
    height: "100%",
    borderRadius: 10,
  },
  freeSlots: {
    fontSize: 16,
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default GetADIsScreen;
