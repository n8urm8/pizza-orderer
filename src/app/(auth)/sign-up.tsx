import Button from "@/src/components/Button";
import Colors from "@/src/constants/Colors";
import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";

const SignUpComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleEmailChange = (text: string) => {
    setEmail(text);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
  };

  const handleSubmit = () => {
    // Add your sign-in logic here
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Sign up" }} />
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="susan@mail.com"
        placeholderTextColor={"gray"}
        autoComplete="email"
        value={email}
        onChangeText={handleEmailChange}
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        autoComplete="password"
        value={password}
        onChangeText={handlePasswordChange}
      />
      <Button text="Create account" onPress={handleSubmit} />
      <Text
        style={styles.textButton}
        onPress={() => router.push("/(auth)/sign-in")}
      >
        Sign in
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    flex: 1,
    padding: 10,
    gap: 10,
  },
  label: {
    color: "gray",
  },
  input: {
    backgroundColor: "white",
    padding: 6,
    borderRadius: 6,
    borderColor: "gray",
    borderWidth: 1,
  },
  textButton: {
    color: Colors.light.tint,
    fontSize: 16,
    alignSelf: "center",
  },
});

export default SignUpComponent;
