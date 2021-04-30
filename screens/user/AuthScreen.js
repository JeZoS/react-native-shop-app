import React from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Card from "../../components/UI/Card";
import Input from "../../components/UI/Input";

const AuthScreen = () => {
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
            errorMessage="Please enter a valid email address."
            onValueChange={() => {}}
            initialValue=""
          />
          <Input
            id="password"
            label="Password"
            keyboardType="default"
            required
            email
            autoCapitalize="none"
            errorMessage="Please enter a valid password."
            onValueChange={() => {}}
            initialValue=""
          />
        </ScrollView>
      </Card>
    </KeyboardAvoidingView>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({});
