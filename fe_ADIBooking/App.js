import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AvailabilityScreen from "./screens/AvailabilityScreen";
import SignUpScreen from "./screens/SignUpScreen";
import GetADIsScreen from "./screens/GetADIsScreen";
import GetLearnersScreen from "./screens/GetLearnersScreen";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("SignUp")}
        >
          <Text style={styles.buttonText}>Sign Up as ADI</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("ADIs")}
        >
          <Text style={styles.buttonText}>View All ADIs</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Learners")}
        >
          <Text style={styles.buttonText}>View All Learners</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Availability")}
        >
          <Text style={styles.buttonText}>See Availability</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const DrawerContent = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.drawerContainer}>
      <View style={styles.drawerItemContainer}>
        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => navigation.navigate("Item1")}
        >
          <Text style={styles.drawerItemText}>Item 1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => navigation.navigate("Item2")}
        >
          <Text style={styles.drawerItemText}>Item 2</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => navigation.navigate("Item3")}
        >
          <Text style={styles.drawerItemText}>Item 3</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Availability" component={AvailabilityScreen} />
        <Drawer.Screen name="SignUp" component={SignUpScreen} />
        <Drawer.Screen name="ADIs" component={GetADIsScreen} />
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
    fontFamily: "Roboto",
  },
  drawerContainer: {
    flex: 1,
    padding: 20,
  },
  drawerItemContainer: {
    flex: 1,
    justifyContent: "center",
  },
  drawerItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  drawerItemText: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Open Sans",
  },
});

export default App;
