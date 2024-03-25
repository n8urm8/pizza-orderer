import { ActivityIndicator, Text, FlatList, StyleSheet } from "react-native";

import OrderListItem from "@/src/components/OrderListItem";
import { Stack } from "expo-router";
import { useUserOrderList } from "@/src/api/orders";

export default function UserOrders() {
  const { data: orders, isLoading, error } = useUserOrderList();
  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch products.</Text>;
  }
  return (
    <>
      <Stack.Screen options={{ title: "Orders" }} />
      <FlatList
        style={styles.orderList}
        data={orders}
        renderItem={({ item }) => (
          <OrderListItem
            id={item.id}
            createdAt={item.created_at}
            status={item.status}
          />
        )}
        numColumns={1}
        contentContainerStyle={{ gap: 10, padding: 10 }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  orderList: {
    gap: 5,
  },
});
