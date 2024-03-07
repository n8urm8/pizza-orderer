import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link, useSegments } from "expo-router";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

dayjs.extend(relativeTime);

interface OrderListItemProps {
  id: number;
  createdAt: string;
  status: string;
}

const OrderListItem: React.FC<OrderListItemProps> = ({
  id,
  createdAt,
  status,
}) => {
  const segments = useSegments();

  return (
    <Link href={`/${segments[0]}/orders/${id}`}>
      <View style={styles.container}>
        <View>
          <Text style={styles.orderNumber}>Order #{id}</Text>
          <Text style={styles.orderDate}>{dayjs(createdAt).fromNow()}</Text>
        </View>
        <Text style={styles.status}>{status}</Text>
      </View>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 10,
    justifyContent: "space-between",
    width: "100%",
    flexDirection: "row",
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: "bold",
  },
  orderDate: {
    fontSize: 14,
    color: "#888",
    marginTop: 5,
  },
  status: {
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "center",
  },
});

export default OrderListItem;
