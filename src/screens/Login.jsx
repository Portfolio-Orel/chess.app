import React, { useEffect, useState } from "react";

import * as Yup from "yup";
import { Formik } from "formik";

import { View, Text, Image, StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";

import OTPCodeInput from "../components/OTPCodeInput";

import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import { confirmSignIn, login } from "../redux/actions/auth";

import screens from "../constants/screens";
import states from "../constants/states";

const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.authState);

  const [isLoadingLogin, setIsLoadingLogin] = useState(false);
  const [error, setError] = useState("");

  const emailSchema = Yup.string().email().required().min(3).max(255);

  const handleLogin = (email) => {
    setIsLoadingLogin(true);
    dispatch(login(email));
  };

  const handleSignUp = () => {
    navigation.navigate(screens.register.route);
  };

  return (
    <View style={styles.container}>
      <Formik
        validationSchema={emailSchema}
        initialValues={{ username: "", password: "" }}
        onSubmit={(values) => handleLogin(values.username, values.password)}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={styles.contentContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                name="username"
                label="אימייל"
                theme={{
                  colors: {
                    primary: "#000", // color of the label and the outline when focused
                    underlineColor: "transparent", // color of the underline when focused
                  },
                }}
                placeholder=""
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                keyboardType="email-address"
                style={styles.textInput}
              />
              <TextInput
                name="password"
                label="סיסמה"
                theme={{
                  colors: {
                    primary: "#000", // color of the label and the outline when focused
                    underlineColor: "transparent", // color of the underline when focused
                  },
                }}
                placeholder=""
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                secureTextEntry
                keyboardType="visible-password"
                style={styles.textInput}
              />
            </View>
            <View style={styles.logoContainer}>
              <Image
                source={require("../assets/images/logo_light.png")}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
            <View style={styles.buttonAndSignUpContainer}>
              <View style={styles.signUpContainer}>
                <Text style={styles.signUpText}>אין לך משתמש?</Text>
                <Button
                  type="text"
                  textColor="#000"
                  style={styles.signUpLink}
                  onPress={handleSignUp}
                >
                  הרשם
                </Button>
              </View>
              <Button
                mode="contained"
                onPress={handleSubmit}
                loading={isLoadingLogin}
                // disabled={!phoneNumber}
                style={styles.loginButton}
                contentStyle={styles.loginButtonContent}
                labelStyle={styles.loginButtonLabel}
                theme={{ colors: { primary: "#000" } }}
              >
                Login
              </Button>
            </View>
          </View>
        )}
      </Formik>
      {error ? <Text style={styles.errorText}>{error}</Text> : ""}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    display: "flex",
    height: "100%",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  inputContainer: {
    marginRight: 10,
    width: "100%",
  },
  logo: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
    height: 250,
  },
  textInput: {
    backgroundColor: "#fff",
    width: "100%",
    marginTop: 20,
  },
  buttonAndSignUpContainer: {
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
  },
  signUpContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  signUpText: {
    fontSize: 14,
    fontWeight: "300",
  },
  signUpLink: {
    fontSize: 14,
    fontWeight: "bold",
    padding: 0,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  loginButton: {
    marginRight: 10,
    height: 48,
    width: "80%",
  },
  loginButtonContent: {
    height: 48,
  },
  loginButtonLabel: {
    fontSize: 16,
    fontWeight: "500",
  },
  signUpButton: {
    flex: 1,
    marginLeft: 10,
  },
  signUpButtonLabel: {
    fontSize: 16,
    fontWeight: "500",
  },
  errorText: {
    fontSize: 12,
    color: "#f00",
    marginTop: 10,
  },
});

export default Login;
