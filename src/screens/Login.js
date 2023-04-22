import React, { useState } from "react";
import { View, Text, Image, ActivityIndicator, StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";
import * as Yup from "yup";
import { Formik } from "formik";

const LoginScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);
  const [error, setError] = useState("");

  // Phone schema numbers only, 10 min, 10 max required
  const phoneSchema = Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .required()
    .min(10)
    .max(10);

  const emailSchema = Yup.string().email().required().min(3).max(255);

  // const handleLogin = () => {
  //   setIsLoadingLogin(true);
  //   // perform login action
  // };

  const handleSignUp = () => {};

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <Formik
          validationSchema={phoneSchema}
          initialValues={{ phoneNumber: "" }}
          onSubmit={(values) => console.log(values)}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View style={styles.contentContainer}>
              <View style={styles.inputContainer}>
                <TextInput
                  name="phoneNumber"
                  label="מספר טלפון"
                  theme={{
                    colors: {
                      primary: "#000", // color of the label and the outline when focused
                      underlineColor: "transparent", // color of the underline when focused
                    },
                  }}
                  placeholder=""
                  value={values.phoneNumber}
                  onChangeText={handleChange("phoneNumber")}
                  onBlur={handleBlur("phoneNumber")}
                  keyboardType="phone-pad"
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
      )}
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

export default LoginScreen;
