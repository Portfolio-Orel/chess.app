import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { TextInput, ActivityIndicator } from "react-native-paper";
import CustomButton from "../components/CustomButton";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { completeRegistration } from "../redux/actions/auth";
import { SafeAreaView } from "react-native-safe-area-context";
import Dropdown from "../components/Dropdown";
import { useEffect } from "react";
import { handleFetchClubs } from "../redux/actions/clubs";

export default function FirstStageRegsiter() {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.authState);
  const clubsState = useSelector((state) => state.clubsState);

  useEffect(() => {
    dispatch(handleFetchClubs());
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.title}>פרטי התחברות</Text>
        <Formik
          initialValues={{
            firstName: "אוראל",
            lastName: "זילברמן",
            clubId: "",
            playerNumber: "202511",
          }}
          onSubmit={(values) => {
            if (values.firstName && values.lastName && values.clubId) {
              dispatch(
                completeRegistration(
                  values.firstName,
                  values.lastName,
                  values.playerNumber,
                  values.clubId
                )
              );
            } else {
              // TODO: set error to fields
            }
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View style={styles.contentContainer}>
              <View style={styles.inputsContainer}>
                <View style={styles.inputContainer}>
                  <TextInput
                    mode="outlined"
                    name="firstName"
                    label="שם פרטי"
                    theme={{
                      colors: {
                        primary: "#000", // color of the label and the outline when focused
                        underlineColor: "transparent", // color of the underline when focused
                      },
                    }}
                    placeholder=""
                    value={values.firstName}
                    onChangeText={handleChange("firstName")}
                    onBlur={handleBlur("firstName")}
                    style={styles.textInput}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <TextInput
                    mode="outlined"
                    name="lastName"
                    label="שם משפחה"
                    theme={{
                      colors: {
                        primary: "#000", // color of the label and the outline when focused
                        underlineColor: "transparent", // color of the underline when focused
                      },
                    }}
                    placeholder=""
                    value={values.lastName}
                    onChangeText={handleChange("lastName")}
                    onBlur={handleBlur("lastName")}
                    style={styles.textInput}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <TextInput
                    mode="outlined"
                    name="clubId"
                    label="מועדון"
                    theme={{
                      colors: {
                        primary: "#000", // color of the label and the outline when focused
                        underlineColor: "transparent", // color of the underline when focused
                      },
                    }}
                    placeholder=""
                    value={values.clubId}
                    onChangeText={handleChange("clubId")}
                    onBlur={handleBlur("clubId")}
                    secureTextEntry
                    style={styles.textInput}
                  />
                  {clubsState.loading ? (
                    <ActivityIndicator />
                  ) : (
                    <Dropdown
                      items={clubsState?.clubs?.map((club) => ({
                        label: club.name,
                        value: club.id,
                      }))}
                      onItemSelected={(clubId) => {
                        handleChange("clubId")(clubId);
                      }}
                    />
                  )}
                </View>
                <View style={styles.inputContainer}>
                  <TextInput
                    mode="outlined"
                    name="playerNumber"
                    label="מספר שחקן ישראל"
                    theme={{
                      colors: {
                        primary: "#000", // color of the label and the outline when focused
                        underlineColor: "transparent", // color of the underline when focused
                      },
                    }}
                    placeholder=""
                    value={values.playerNumber}
                    onChangeText={handleChange("playerNumber")}
                    onBlur={handleBlur("playerNumber")}
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
                  <Text style={styles.buttonText}>המשך</Text>
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
