import { StyleSheet, Text, FlatList, ActivityIndicator } from "react-native";

import Colors from "@/src/constants/Colors";
import products from "@/assets/data/products";
import { ProductListItem } from "@/src/components/ProductListItem";
import { useProducts } from "@/src/api/products";

export default function TabOneScreen() {
  const { data: products, isLoading, error } = useProducts();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch products.</Text>;
  }
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
