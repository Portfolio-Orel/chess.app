import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import * as Yup from "yup";
import { Button } from "react-native-paper";

const OTPCodeInput = ({
  onOTPCodeEntered,
  isLoading = false,
  numInputs = 6,
}) => {
  const [values, setValues] = useState([...Array(numInputs)].map(() => ""));
  const validationSchema = Yup.array().of(Yup.string().required("Required"));

  const handleCodeInput = (index, value) => {
    const newValues = [...values];
    newValues[index] = value[value.length - 1];
    setValues(newValues);
    if (index < numInputs - 1 || !value) {
      const nextInput = `input_${index + 1}`;
      if (value) {
        this[nextInput].focus();
      } else {
        if (index > 0) {
          const prevInput = `input_${index - 1}`;
          this[prevInput].focus();
        }
      }
    } else if (value) {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    validationSchema
      .validate(values)
      .then(() => {
        onOTPCodeEntered(values.join(""));
      })
      .catch((error) => {
        // handle validation errors
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputsContainer}>
        {[...Array(numInputs)].map((_, i) => (
          <TextInput
            key={`input_${i}`}
            ref={(ref) => (this[`input_${i}`] = ref)}
            style={styles.input}
            maxLength={1}
            onChangeText={(value) => {
              handleCodeInput(i, value);
            }}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === "Backspace") {
                handleCodeInput(i, "");
              }
              // if its a number, handleCodeInput with the new value
              if (!isNaN(nativeEvent.key)) {
                handleCodeInput(i, `${values[i]}${nativeEvent.key}`);
              }
            }}
            value={values[i]}
            keyboardType="phone-pad"
            autoCorrect={false}
            autoCapitalize="none"
            returnKeyType={i < numInputs - 1 ? "next" : "done"}
            blurOnSubmit={false}
            onSubmitEditing={() => {
              if (i < numInputs - 1) {
                const nextInput = `input_${i + 1}`;
                this[nextInput].focus();
              } else {
                handleSubmit();
              }
            }}
          />
        ))}
      </View>
      <Button
        mode="contained"
        onPress={() => handleSubmit()}
        loading={isLoading}
        style={{ marginTop: 10 }}
      >
        שלח
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "90%",
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 10,
  },
  inputsContainer: {
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
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
