import React from "react";
import {
  StyleSheet,
  Button,
  Text,
  View,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import Colors from "../../constants/Colors";
import CartItem from "../../components/shop/cartItem";
import { removeFromCart } from "../../store/actions/cart";
import { addOrder } from "../../store/actions/orders";

const CartScreen = (props) => {
  const cartItems = useSelector((state) => state.cart);
  const { items, totalAmount } = cartItems;
  const cart = [];
  const dispatch = useDispatch();
  for (const key in items) {
    cart.push({
      productId: key,
      productTitle: items[key].productTitle,
      productPrice: items[key].productPrice,
      sum: items[key].sum,
      quantity: items[key].quantity,
    });
  }
  cart.sort((a, b) => (a.productId > b.productId ? a : b));
  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{" "}
          <Text style={styles.amount}>
            ${totalAmount.toFixed(2)}
          </Text>
        </Text>
        <Button
          title="Order Now"
          color={Colors.accent}
          onPress={() => {
            dispatch(addOrder(cart, totalAmount));
          }}
          disabled={cart.length > 0 ? false : true}
        />
      </View>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.productId}
        renderItem={(itemData) => (
          <CartItem
            onRemove={() => {
              dispatch(
                removeFromCart(itemData.item.productId)
              );
            }}
            item={itemData.item}
          />
        )}
      />
    </View>
  );
};

CartScreen.navigationOptions = {
    headerTitle: "Your Cart",
  };

export default CartScreen;

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: "row",
    padding: 20,
    // shadowColor: "black",
    // shadowOpacity: 0.26,
    // shadowOffset: { width: 0, height: 2 },
    // shadowRadius: 8,
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    elevation: 5,
    borderRadius: 10,
    // backgroundColor: "gray",
  },
  summaryText: {
    fontFamily: "open-sans-bold",
  },
  amount: {
    color: Colors.primary,
  },
});
