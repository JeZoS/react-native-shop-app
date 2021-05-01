import React, {
  useCallback,
  useReducer,
  useState,
} from "react";
import {
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Colors from "../../constants/Colors";
import Card from "../../components/UI/Card";
import Input from "../../components/UI/Input";
import { useDispatch } from "react-redux";
import { login, signup } from "../../store/actions/auth";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid =
        updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const AuthScreen = (props) => {
  const [isSignup, setIsSignup] = useState(false);

  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(
    formReducer,
    {
      inputValues: {
        email: "",
        password: "",
      },
      inputValidities: {
        email: false,
        password: false,
      },
      formIsValid: false,
    }
  );

  const signupHandler = async () => {
    try {
      await dispatch(
        signup(
          formState.inputValues.email,
          formState.inputValues.password
        )
      );
      props.navigation.navigate("Shop");
    } catch (error) {
      console.log(error);
    }
  };

  const loginHandler = async () => {
    try {
      await dispatch(
        login(
          formState.inputValues.email,
          formState.inputValues.password
        )
      );
      props.navigation.navigate("Shop");
    } catch (error) {
      console.log(error);
    }
  };

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <Card style={styles.authContainer}>
        <ScrollView>
          <Input
            id="email"
            label="E-mail"
            keyboardType="email-address"
            required
            email
            autoCapitalize="none"
            errorText="Please enter a valid email address."
            initialValue=""
            onInputChange={inputChangeHandler}
          />
          <Input
            id="password"
            label="Password"
            keyboardType="default"
            required
            password
            autoCapitalize="none"
            errorText="Please enter a valid password."
            initialValue=""
            onInputChange={inputChangeHandler}
          />
          <View style={styles.button}>
            <Button
              title={isSignup ? "Sign Up" : "Login"}
              color={Colors.primary}
              onPress={
                isSignup ? signupHandler : loginHandler
              }
            />
          </View>
          <View style={styles.button}>
            <Button
              title={`Switch to ${
                isSignup ? "Login" : "Signup"
              }`}
              color={Colors.accent}
              onPress={() => {
                setIsSignup((prev) => !prev);
              }}
            />
          </View>
        </ScrollView>
      </Card>
    </KeyboardAvoidingView>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
  },
  button: {
    marginVertical: 5,
  },
});
