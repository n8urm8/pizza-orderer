import { View, Text, StyleSheet, FlatList, Pressable, ActivityIndicator } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import orders from "../../../../assets/data/orders";
import OrderItemListItem from "../../../components/OrderItemListItem";
import OrderListItem from "../../../components/OrderListItem";
import { OrderStatus, OrderStatusList } from "@/src/types";
import Colors from "@/src/constants/Colors";
import { useOrderWithId, useUpdateOrder } from "@/src/api/orders";

const OrderDetailScreen = () => {
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === "string" ? idString : idString[0])
  const {data: order, isLoading, error} = useOrderWithId(id)
  const { mutate: updateOrder, isPending } = useUpdateOrder()


  if (!order) {
    return <Text>Order not found!</Text>;
  }

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch order.</Text>;
  }

  const updateStatus = (status: OrderStatus) => {
    updateOrder({id: id, updatedOrder: {status}})
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Order #${order.id}` }} />

      <OrderListItem
        id={order.id}
        createdAt={order.created_at}
        status={order.status}
      />

      <FlatList
        data={order.order_items}
        renderItem={({ item }) =>  <OrderItemListItem item={item} />}
        contentContainerStyle={{ gap: 10 }}
        ListFooterComponent={
          <>
            <Text style={{ fontWeight: "bold" }}>Status</Text>
            <View style={{ flexDirection: "row", gap: 5 }}>
              {OrderStatusList.map((status) => (
                <Pressable
                  key={status}
                  onPress={() => updateStatus(status)}
                  disabled={isPending}
                  style={{
                    borderColor: Colors.light.tint,
                    borderWidth: 1,
                    padding: 10,
                    borderRadius: 5,
                    marginVertical: 10,
                    backgroundColor:
                      order.status === status
                        ? Colors.light.tint
                        : "transparent",
                  }}
                >
                  <Text
                    style={{
                      color:
                        order.status === status ? "white" : Colors.light.tint,
                    }}
                  >
                    {status}
                  </Text>
                </Pressable>
              ))}
            </View>
          </>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    gap: 10,
  },
});

export default OrderDetailScreen;
