import { StatusBar } from "expo-status-bar";
import { useContext } from "react";
import { View, Text, Platform } from "react-native";
import { CartContext } from "@/src/providers/CartProvider";

const CartScreen = () => {
  const { items } = useContext(CartContext);
  return (
    <View>
      <Text>Cart</Text>
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
};

export default CartScreen;
