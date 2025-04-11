import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";

const SignUpScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [location, setLocation] = useState("");

  const handleSignUp = () => {
    fetch("http://192.168.0.28:3000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstName, lastName, location }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("User added with ID:", data);
      })
      .catch((error) => console.error("Error signing up:", error));
  };

  return (
    <View>
      <Text>Sign Up</Text>
      <TextInput
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
      />
      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  );
};

export default SignUpScreen;
