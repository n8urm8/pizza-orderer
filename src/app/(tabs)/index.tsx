import { StyleSheet, View, Text, Image } from "react-native";

import EditScreenInfo from "@/src/components/EditScreenInfo";
import Colors from "@/src/constants/Colors";
import products from "@/assets/data/products";

const product = products[1];

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>{product.price}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginVertical: 10,
  },
  price: {
    color: Colors.light.tint,
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
});