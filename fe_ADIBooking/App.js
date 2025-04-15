import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaView, Text, TouchableOpacity, View, StyleSheet } from "react-native";

import GetADIsScreen from "./screens/GetADIsScreen";
import ADICalendarScreen from "./screens/ADICalendarScreen";
import SignUpScreen from "./screens/SignUpScreen";
import AvailabilityScreen from "./screens/AvailabilityScreen";
import GetLearnersScreen from "./screens/GetLearnersScreen";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const ADIStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="GetADIs" component={GetADIsScreen} options={{ title: "All ADIs" }} />
    <Stack.Screen name="ADICalendar" component={ADICalendarScreen} options={{ title: "ADI Calendar" }} />
  </Stack.Navigator>
);

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.buttonText}>Sign Up as ADI</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("ADIs")}>
          <Text style={styles.buttonText}>View All ADIs</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Learners")}>
          <Text style={styles.buttonText}>View All Learners</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Availability")}>
          <Text style={styles.buttonText}>See Availability</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Availability" component={AvailabilityScreen} />
        <Drawer.Screen name="SignUp" component={SignUpScreen} />
        <Drawer.Screen name="ADIs" component={ADIStack} />
        <Drawer.Screen name="Learners" component={GetLearnersScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  button: {
    width: "90%",
    padding: 15,
    backgroundColor: "#396d2f",
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default App;
