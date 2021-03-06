import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  ActivityIndicator,
} from "react-native";
import { useDispatch } from "react-redux";
import Colors from "../constants/Colors";
import { authenticate } from "../store/actions/auth";

const StartUp = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem(
        "userData"
      );
      if (!userData) {
        props.navigation.navigate("Auth");
        return;
      }
      const transformedData = JSON.parse(userData);
      const { token, userId, expiryDate } = transformedData;
      const expirationDate = new Date(expiryDate);
      if (
        expirationDate <= new Date() ||
        !token ||
        !userId
      ) {
        props.navigation.navigate("Auth");
        return;
      }
      props.navigation.navigate("Shop");
      dispatch(authenticate(userId, token));
    };
    tryLogin();
  }, []);
  return (
    <View style={styles.screen}>
      <ActivityIndicator
        size="large"
        color={Colors.primary}
      />
    </View>
  );
};

export default StartUp;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
