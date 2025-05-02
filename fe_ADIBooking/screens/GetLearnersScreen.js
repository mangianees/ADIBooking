import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { Text, Card,Title,Paragraph } from 'react-native-paper';
import {colors} from "../theme/colors";
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

  const maskPostCode = (postCode) => {
    return postCode.slice(0, -3) + '***';
  };

  const renderLearners = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Title style={styles.name}>Full Name: {item.first_name} {item.last_name}</Title>
        <Paragraph style={styles.location}>Location: {item.location}</Paragraph>
        <Paragraph style={styles.goal}>Goal: {item.goal}</Paragraph>
        <Paragraph style={styles.post_code}>Post Code: {maskPostCode(item.post_code)}</Paragraph>
        <Paragraph style={styles.door_number}>Door No: {item.door_number}</Paragraph>
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
    backgroundColor: colors.background, // Changed background color
    flex: 1,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.font, // Changed font color
  },
  card: {
    marginBottom: 12,
    borderRadius: 10,
    elevation: 2,
    backgroundColor: colors.background, // Changed background color
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.font, // Changed font color
  },
  location: {
    fontSize: 16,
    color: colors.font, // Changed font color
  },
  goal: {
    fontSize: 16,
    color: colors.font, // Changed font color
  },
  post_code: {
    fontSize: 16,
    color: colors.font, // Changed font color
  },
  door_number: {
    fontSize: 16,
    color: colors.font, // Changed font color
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GetLearnersScreen;
