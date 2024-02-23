import { StatusBar } from "expo-status-bar";
import { View, Text, Platform } from "react-native";
import { useCart } from "../providers/CartProvider";

const CartScreen = () => {
  const {items} = useCart()
  
  return (
    <View>
      <Text>Cart items: { items.length }</Text>
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
};

export default CartScreen;
