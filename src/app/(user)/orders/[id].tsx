import OrderListItem from "@/src/components/OrderListItem";
import { ProductListItem } from "@/src/components/ProductListItem";
import React from "react";
import { View, FlatList } from "react-native";
import orders from "@/assets/data/orders";
import { useLocalSearchParams } from "expo-router";

const OrderDetailsPage = () => {
  const { id } = useLocalSearchParams();
  const order = orders.find((o) => o.id === Number(id));

  return (
    <View>
      <OrderListItem id={order.id} />
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ProductListItem product={item} />}
      />
    </View>
  );
};

export default OrderDetailsPage;
