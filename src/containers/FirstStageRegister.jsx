import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { TextInput } from "react-native-paper";
import CustomButton from "../components/CustomButton";
import { Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/actions/auth";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FirstStageRegsiter({ isUserRegistered = false }) {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.authState);
  const [error, setError] = useState("");

  const registerSchema = Yup.object().shape({
    password: Yup.string().required().min(8).max(16),
    phone: Yup.string()
      .matches(/^[0-9]+$/, "Must be only digits")
      .required()
      .min(10)
      .max(10),
    email: Yup.string().email().required().min(3).max(255),
  });

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.title}>פרטי התחברות</Text>
        <Formik
          validationSchema={registerSchema}
          initialValues={{
            password: "12345678",
            confirmPassword: "12345678",
            phone: "0543056286",
            email: "thischessapp@gmail.com",
          }}
          onSubmit={(values) => {
            if (values.password === values.confirmPassword) {
              dispatch(register(values.email, values.phone, values.password));
            } else {
              setError("הסיסמאות לא תואמות");
            }
          }}
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
                <View style={styles.inputContainer}>
                  <TextInput
                    mode="outlined"
                    name="password"
                    label="סיסמא"
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
                    style={styles.textInput}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <TextInput
                    mode="outlined"
                    name="confirmPassword"
                    label="אימות סיסמא"
                    theme={{
                      colors: {
                        primary: "#000", // color of the label and the outline when focused
                        underlineColor: "transparent", // color of the underline when focused
                      },
                    }}
                    placeholder=""
                    value={values.confirmPassword}
                    onChangeText={handleChange("confirmPassword")}
                    onBlur={handleBlur("confirmPassword")}
                    secureTextEntry
                    style={styles.textInput}
                  />
                </View>
                <Text style={{ color: "#ba221b" }}>{authState?.error}</Text>
              </View>
              <View style={styles.buttonContainer}>
                <CustomButton
                  mode="contained"
                  onPress={handleSubmit}
                  loading={authState.isLoading}
                  style={styles.button}
                >
                  המשך
                </CustomButton>
              </View>
            </View>
          )}
        </Formik>
      </View>
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
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
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
  title: {
    width: "100%",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "semibold",
    marginBottom: 20,
  },
});
