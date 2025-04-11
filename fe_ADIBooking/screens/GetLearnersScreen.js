import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';

const GetLearnersScreen = () => {
  const [Learners, setLearners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://192.168.0.28:3000/learners') // 🔁 Replace with your IP or emulator IP
      .then((response) => response.json())
      .then((data) => {
        setLearners(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching Learners:', error);
        setLoading(false);
      });
  }, []);

  const renderLearners = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.name}> Full Name:
        {item.first_name} {item.last_name}
      </Text>
      <Text style={styles.location}>Location: {item.location}</Text>
      <Text style={styles.goal}>Goal: {item.goal}</Text>
      <Text style={styles.post_code}>Post Code: {item.post_code}</Text>
      <Text style={styles.door_number}>Door No: {item.door_number}</Text>
    </View>
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
      <Text style={styles.heading}>Learners and PDIs</Text>
      <FlatList
        data={Learners}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderLearners}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F9F9F9',
    flex: 1,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 12,
    borderRadius: 10,
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  location: {
    fontSize: 16,
    color: '#555',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GetLearnersScreen;
