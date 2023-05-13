import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import * as Yup from "yup";
import { Button, Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import { confirmSignUp } from "../redux/actions/auth";

const OTPCodeInput = ({ numInputs = 6 }) => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.authState);

  const initialValues = {
    code: Array(numInputs).fill(""),
  };

  const validationSchema = Yup.object().shape({
    code: Yup.array().of(Yup.string().required("Required")),
  });

  const handleSubmit = (values) => {
    dispatch(confirmSignUp(authState.user?.username, values.code.join("")));
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <View style={styles.inputsAndButtonContainer}>
            <View style={styles.inputsContainer}>
              {values.code.map((value, index) => (
                <TextInput
                  key={index}
                  style={styles.input}
                  maxLength={1}
                  onChangeText={handleChange(`code[${index}]`)}
                  onBlur={handleBlur(`code[${index}]`)}
                  value={value}
                  keyboardType="phone-pad"
                  autoCorrect={false}
                  autoCapitalize="none"
                  returnKeyType={index < numInputs - 1 ? "next" : "done"}
                  blurOnSubmit={false}
                  onSubmitEditing={() => {
                    if (index < numInputs - 1) {
                      this[`input_${index + 1}`].focus();
                    } else {
                      handleSubmit();
                    }
                  }}
                />
              ))}
            </View>
            <Button
              mode="contained"
              onPress={handleSubmit}
              loading={authState.isLoading}
              style={{ marginTop: 10 }}
            >
              שלח
            </Button>
          </View>
        )}
      </Formik>
      <Text style={{ marginTop: 10 }}>{authState.error ?? ""}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "90%",
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 10,
  },
  inputsAndButtonContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  inputsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: 50,
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 10,
    gap: 3,
  },
  input: {
    width: 46,
    height: 46,
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    textAlign: "center",
  },
});

export default OTPCodeInput;
