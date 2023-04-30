// Formik x React Native example
import React from "react";
import { View } from "react-native";
import { Formik } from "formik";
import { Button, TextInput, IconButton } from "react-native-paper";

export const MyReactNativeForm = (props) => (
  <Formik
    initialValues={{ email: "" }}
    onSubmit={(values) => console.log(values)}
  >
    {({ handleChange, handleBlur, handleSubmit, values }) => (
      <></>
    )}
  </Formik>
);
