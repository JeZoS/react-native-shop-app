import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import Colors from "../constants/Colors";
import { Platform } from "react-native";
import ProductsDetailScreen from "../screens/shop/ProductsDetailScreen";

const ProductNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail:ProductsDetailScreen
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor:
          Platform.OS === "android" ? Colors.primary : "",
      },
      headerTitleStyle:{
          fontFamily:"open-sans"
      }
      ,
      headerTintColor:
        Platform.OS === "android"
          ? "white"
          : Colors.primary,
    },
  }
);

export default createAppContainer(ProductNavigator)