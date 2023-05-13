import React from "react";
import { StyleSheet, View } from "react-native";
import { Formik } from "formik";

import FirstStageRegsiter from "../containers/FirstStageRegister";
import SecondStageRegister from "../containers/SecondStageRegister";
import OTPCodeInput from "../containers/OTPCodeInput";

import { useSelector } from "react-redux";

import states from "../constants/states";
import { useMemo } from "react";

export function Register() {
  const authState = useSelector((state) => state.authState);

  const Content = useMemo(() => {
    switch (authState?.state) {
      case states.unauthorized:
        return <FirstStageRegsiter />;
      case states.register_user_details_required:
        return <SecondStageRegister />;
      case states.sign_up_confirmation_required:
        return <OTPCodeInput />;
      default:
        return <FirstStageRegsiter />;
    }
  }, [authState.state]);

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ email: "" }}
        onSubmit={(values) => console.log(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <React.Fragment>{Content}</React.Fragment>
        )}
      </Formik>
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
