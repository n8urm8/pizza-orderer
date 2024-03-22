import { FlatList, StyleSheet } from "react-native";

import orders from "@/assets/data/orders";
import OrderListItem from "@/src/components/OrderListItem";
import { Stack } from "expo-router";

export default function TabTwoScreen() {
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
