import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function TimeControl({ game }) {
  return (
    <View>
      <Text style={styles.text}>
        {game?.time_start_min}
        {game?.increment_before_time_control_sec
          ? ` + ${game?.increment_before_time_control_sec}`
          : ""}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
