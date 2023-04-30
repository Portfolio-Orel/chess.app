import React from "react";
import useAuthState from "../hooks/useAuthState";
import { View, Text, StyleSheet } from "react-native";

export default function Content() {
  const authState = useAuthState();

  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    padding: 20,
    backgroundColor: "#00ff00",
  },
});
