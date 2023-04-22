import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import OTPCodeInput from "../components/OTPCodeInput";
import { useDispatch, useSelector } from "react-redux";
import { register, confirmSignUp } from "../redux/actions/auth";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FirstStageRegsiter({ isUserRegistered = false }) {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const [isRegistered, setIsRegistered] = useState(isUserRegistered);

  useEffect(() => {
    if (authState && authState.user) {
      setIsRegistered(true);
    } else {
      setIsRegistered(false);
    }
  }, [authState]);

  const registerSchema = Yup.object().shape({
    phone: Yup.string()
      .matches(/^[0-9]+$/, "Must be only digits")
      .required()
      .min(10)
      .max(10),
    email: Yup.string().email().required().min(3).max(255),
  });

  return (
    <SafeAreaView>
      {isRegistered ? (
        <OTPCodeInput
          onOTPCodeEntered={(code) => {
            dispatch(confirmSignUp(authState?.user?.username, code));
          }}
          isLoading={authState.isLoading}
        />
      ) : (
        <View style={styles.container}>
          <Text>Some login details</Text>
          <Formik
            validationSchema={registerSchema}
            initialValues={{
              phone: "0543056286",
              email: "thischessapp@gmail.com",
            }}
            onSubmit={(values) =>
              dispatch(register(values.email, values.phone))
            }
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <View style={styles.contentContainer}>
                <View style={styles.inputsContainer}>
                  <View style={styles.inputContainer}>
                    <TextInput
                      mode="outlined"
                      name="phone"
                      label="מספר טלפון"
                      theme={{
                        colors: {
                          primary: "#000", // color of the label and the outline when focused
                          underlineColor: "transparent", // color of the underline when focused
                        },
                      }}
                      placeholder=""
                      value={values.phone}
                      onChangeText={handleChange("phone")}
                      onBlur={handleBlur("phone")}
                      keyboardType="phone-pad"
                      style={styles.textInput}
                    />
                  </View>
                  <View style={styles.inputContainer}>
                    <TextInput
                      mode="outlined"
                      name="email"
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
                  </View>
                  <Text style={{ color: "#ba221b" }}>{authState?.error}</Text>
                </View>
                <Button
                  mode="contained"
                  onPress={handleSubmit}
                  loading={authState.isLoading}
                  style={styles.buttonContainer}
                >
                  <Text style={styles.buttonText}>המשך</Text>
                </Button>
              </View>
            )}
          </Formik>
        </View>
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputsContainer: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 10,
  },
  inputContainer: {
    marginRight: 10,
    width: "100%",
  },
  buttonContainer: {
    width: 140,
    height: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 20,
  },
  contentContainer: {
    display: "flex",
    height: "100%",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
});
