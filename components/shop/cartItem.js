import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "../../constants/Colors";

const cartItem = (props) => {
  return (
    <View style={styles.cartItem}>
      <View style={styles.itemData}>
        <Text style={styles.quantity}>{props.item.quantity}  </Text>
        <Text style={styles.title}>{props.item.productTitle}</Text>
      </View>
      <View style={styles.itemData}>
        <Text style={styles.amount}>${props.item.sum.toFixed(2)}</Text>
        <TouchableOpacity
          onPress={props.onRemove}
          style={styles.deleteButton}
        >
          <Ionicons
            color="red"
            name={
              Platform.OS == "android"
                ? "md-trash"
                : "ios-trash"
            }
            size={23}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default cartItem;

const styles = StyleSheet.create({
  cartItem: {
    padding: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginVertical:5
  },
  itemData: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantity: {
    color: "#888",
    fontSize: 16,
  },
  title: {
    fontSize: 16,
  },
  amount: {
    fontSize: 16,
  },
  deleteButton: { margin: 20 },
});
