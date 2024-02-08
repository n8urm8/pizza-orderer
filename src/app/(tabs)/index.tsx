import { StyleSheet, View, FlatList, Image } from "react-native";

import Colors from "@/src/constants/Colors";
import products from "@/assets/data/products";
import { ProductListItem } from "@/src/components/ProductListItem";

export default function TabOneScreen() {
  return (
    <FlatList
      style={styles.productList}
      data={products}
      renderItem={({ item }) => <ProductListItem product={item} />}
      numColumns={2}
      contentContainerStyle={{ gap: 10, padding: 10 }}
      columnWrapperStyle={{ gap: 10 }}
    />
  );
}

const styles = StyleSheet.create({
  productList: {
    gap: 5,
  },
});
