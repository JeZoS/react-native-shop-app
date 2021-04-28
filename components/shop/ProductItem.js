import React from "react";
import {
  StyleSheet,
  Image,
  Text,
  View,
  Button,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import Colors from "../../constants/Colors";

const ProductItem = (props) => {
  let Touchablecmp = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    Touchablecmp = TouchableNativeFeedback;
  }

  return (
    <View style={styles.product}>
      <View style={styles.touchable}>
        <Touchablecmp
          onPress={props.onViewDetail}
          useForeground
        >
          <View>
            <Image
              style={styles.image}
              source={{ uri: props.image }}
            />
            <View style={styles.details}>
              <Text style={styles.title}>
                {props.title}
              </Text>
              <Text style={styles.price}>
                ${props.price.toFixed(2)}
              </Text>
            </View>
            <View style={styles.action}>
              <Button
                color={Colors.primary}
                title="View Details"
                onPress={props.onViewDetail}
              />
              <Button
                color={Colors.primary}
                title="Add To Cart"
                onPress={props.onAddToCart}
              />
            </View>
          </View>
        </Touchablecmp>
      </View>
    </View>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  product: {
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    height: 300,
    margin: 20,
  },
  touchable: {
    overflow: "hidden",
    borderRadius: 10,
  },
  image: {
    height: "60%",
    width: "100%",
  },
  title: { fontSize: 18, margin: 4 },
  price: {
    fontSize: 14,
    color: "#888",
  },
  action: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "25%",
    paddingHorizontal: 20,
    paddingBottom:20
  },
  details: {
    marginVertical: 4,
    alignItems: "center",
    height: "15%",
  },
});
