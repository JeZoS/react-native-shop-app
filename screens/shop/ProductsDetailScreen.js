import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Colors from "../../constants/Colors";
import { addToCart } from "../../store/actions/cart";

const ProductsDetailScreen = (props) => {
  const productId = props.navigation.getParam("productId");

  const selectedProduct = useSelector((state) =>
    state.products.availableProducts.find(
      (prod) => prod.id === productId
    )
  );

  const cartItems = useSelector(
    (state) => state.cart.items
  );
  console.log(cartItems);

  const dispatch = useDispatch();

  return (
    <ScrollView>
      <Image
        style={styles.image}
        source={{ uri: selectedProduct.imageUrl }}
      />
      <View style={styles.actions}>
        <Button
          color={Colors.primary}
          title="Add to cart"
          onPress={() =>
            dispatch(addToCart(selectedProduct))
          }
        />
      </View>
      <Text style={styles.price}>
        ${selectedProduct.price}
      </Text>
      <Text style={styles.description}>
        {selectedProduct.description}
      </Text>
    </ScrollView>
  );
};

ProductsDetailScreen.navigationOptions = (navData) => {
  const title = navData.navigation.getParam("productTitle");
  return {
    headerTitle: title,
  };
};

export default ProductsDetailScreen;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },
  price: {
    fontSize: 20,
    color: "#888",
    textAlign: "center",
    marginVertical: 10,
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    marginHorizontal: 20,
  },
  actions: {
    marginVertical: 10,
    alignItems: "center",
  },
});