import React from "react";
import { FlatList, StyleSheet } from "react-native";
import {
  HeaderButtons,
  Item,
} from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import { addToCart } from "../../store/actions/cart";

const ProductsOverviewScreen = (props) => {
  const products = useSelector(
    (state) => state.products.availableProducts
  );
  const dispatch = useDispatch();

  return (
    <FlatList
      data={products}
      renderItem={(item) => (
        <ProductItem
          image={item.item.imageUrl}
          title={item.item.title}
          price={item.item.price}
          onViewDetail={() => {
            props.navigation.navigate({
              routeName: "ProductDetail",
              params: {
                productId: item.item.id,
                productTitle: item.item.title,
              },
            });
          }}
          onAddToCart={() => {
            dispatch(addToCart(item.item));
          }}
        />
      )}
    />
  );
};

ProductsOverviewScreen.navigationOptions = {
  headerTitle: "All products",
  headerRight: () => (
    <HeaderButtons
      HeaderButtonComponent={CustomHeaderButton}
    >
      <Item
        title="cart"
        iconName="md-cart"
        onPress={() => {}}
      />
    </HeaderButtons>
  ),
};

export default ProductsOverviewScreen;

const styles = StyleSheet.create({});
