import React from "react";
import { getMonthName, getDayOfMonth } from "../utils/dateUtils";
import { StyleSheet, Text, View } from "react-native";

export default function EventDate({ event }) {
  return (
    <View style={styles.gameDateContainer}>
      <Text style={styles.gameDate}>{getDayOfMonth(event.date)}</Text>
      <Text style={styles.gameDate}>{getMonthName(event.date)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  gameDateContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  gameDate: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
