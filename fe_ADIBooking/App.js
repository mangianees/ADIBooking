import React from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { colors } from "./theme/colors";
import GetADIsScreen from "./screens/GetADIsScreen";
import ADICalendarScreen from "./screens/ADICalendarScreen";
import SignUpScreen from "./screens/SignUpScreen";
import AvailabilityScreen from "./screens/AvailabilityScreen";
import GetLearnersScreen from "./screens/GetLearnersScreen";

const { width, height } = Dimensions.get("window");

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const ADIStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="GetADIs" component={GetADIsScreen} options={{ title: "All ADIs" }} />
    <Stack.Screen name="ADICalendar" component={ADICalendarScreen} options={{ title: "ADI Calendar" }} />
  </Stack.Navigator>
);

const BackgroundText = () => {
  const repeats = 8;
  const lines = [];

  for (let i = 0; i < repeats; i++) {
    lines.push(
      <Text key={i} style={styles.backgroundText}>
        instructly   instructly   instructly   instructly
      </Text>
    );
  }

  return <View style={styles.backgroundContainer}>{lines}</View>;
};

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <BackgroundText />
      <Text style={styles.header}>instructly</Text>
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

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <Text style={styles.drawerHeader}>Instructly</Text>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          drawerStyle: {
            backgroundColor: colors.background, // Changed menu color
          },
          drawerLabelStyle: {
            color: colors.font,
          },
        }}
      >
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
    backgroundColor: colors.background, // Changed background color
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
    position: "relative",
  },
  backgroundContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width,
    height,
    zIndex: -1,
    justifyContent: "center",
    opacity: 0.05,
    paddingHorizontal: 10,
  },
  backgroundText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#7a8c23", // Changed text color
    lineHeight: 50,
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#2e4a62",
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
  drawerHeader: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginVertical: 20,
  },
});

export default App;
