import { ActivityIndicator, FlatList, StyleSheet, Text } from "react-native";

import OrderListItem from "@/src/components/OrderListItem";
import { Stack } from "expo-router";
import { useAdminOrderList } from "@/src/api/orders";
import { useInsertOrderSubscriptionListener } from "@/src/api/orders/subscriptions";

export default function OrdersScreen() {
  const { data: orders, isLoading, error } = useAdminOrderList({});
  
  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch products.</Text>;
  }

  useInsertOrderSubscriptionListener()
  
  return (
    <>
      <Stack.Screen options={{ title: "Active" }} />
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
