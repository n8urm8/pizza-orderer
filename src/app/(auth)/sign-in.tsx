import Button from "@/src/components/Button";
import Colors from "@/src/constants/Colors";
import { supabase } from "@/src/lib/supabase";
import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import { View, TextInput, StyleSheet, Text, Alert } from "react-native";

const SignInComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleEmailChange = (text: string) => {
    setEmail(text);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      Alert.alert("Error", error.message);
    }

    if (!error) {
      setEmail("");
      setPassword("");
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Sign in" }} />
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
      <Button
        text={loading ? "Signing in..." : "Sign In"}
        disabled={loading}
        onPress={handleSubmit}
      />
      <Text
        style={styles.textButton}
        onPress={() => router.push("/(auth)/sign-up")}
      >
        Create an account
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

export default SignInComponent;
