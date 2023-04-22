import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { Formik } from "formik";
import FirstStageRegsiter from "../containers/FirstStageRegister";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";

export function Register() {
  const authState = useSelector((state) => state.auth);
  const [isRegistered, setIsRegistered] = useState(
    authState.user ? true : false
  );
  const [isConfirmed, setIsConfirmed] = useState(
    authState.isConfirmed ? true : false
  );

  useEffect(() => {
    if (authState?.user) {
      setIsRegistered(true);
    } else {
      setIsRegistered(false);
    }
    if (authState?.user?.isConfirmed) {
      setIsConfirmed(true);
    } else {
      setIsConfirmed(false);
    }
  }, [authState]);

  return (
    <View style={styles.container}>
      {isConfirmed ? (
        <>
          <Text>Confirmed</Text>
        </>
      ) : (
        <Formik
          initialValues={{ email: "" }}
          onSubmit={(values) => console.log(values)}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <FirstStageRegsiter />
          )}
        </Formik>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    width: "100%",
    height: "100%",
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
});

export default Register;
