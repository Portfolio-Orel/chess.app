import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useSelector } from "react-redux";
import { getMonthName, getDayOfMonth } from "../utils/dateUtils";
import { FAB } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";

import { handleAddEventParticipant } from "../redux/actions/eventsParticipants";

export default function EventCard({
  event,
  game,
  gameFormat,
  participants,
  loading,
  ...props
}) {
  const authState = useSelector((state) => state.authState);
  const [isUserRegistered, setIsUserRegistered] = useState(false);

  useEffect(() => {
    if (authState.user) {
      const userParticipant = participants.find(
        (participant) => participant.userId === authState.user.id
      );
      setIsUserRegistered(userParticipant ? true : false);
    }
  }, [authState]);

  return (
    <View style={styles.container} {...props}>
      <FAB
        style={[
          styles.registerButton,
          isUserRegistered ? styles.registeredColor : styles.notRegisteredColor,
        ]}
        icon={({ size, color }) => (
          <Icon name="check" size={size} color="white" />
        )}
        onPress={() => handleAddEventParticipant(event.id, authState.user.id)}
      />
      <View style={styles.contentContainer}>
        <View style={styles.gameDateContainer}>
          <Text style={styles.gameDate}>{getDayOfMonth(event.date)}</Text>
          <Text style={styles.gameDate}>{getMonthName(event.date)}</Text>
        </View>
        <View style={styles.gameDetails}>
          <Text>{event.name}</Text>
          <Text>{event.description}</Text>
          <Text>{event.name}</Text>
        </View>
        <View style={styles.gameIconContainer}>
          <Text>{event.name}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 80,
    position: "relative",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  contentContainer: {
    flex: 1,
    display: "flex",
    height: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 6,
    marginHorizontal: 10,
  },
  registerButton: {
    borderRadius: "50%",
    marginStart: 10,
  },
  registeredColor: {
    backgroundColor: "#57e954",
  },
  notRegisteredColor: {
    backgroundColor: "gray",
  },
  blackAndWhite: {
    filter: "grayscale(100%)",
    tintColor: "gray",
  },
  gameDateContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  gameDate: {
    fontSize: 24,
    color: "#000",
  },
  gameDetails: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  gameIconContainer: {
    height: "100%",
    width: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  gameIcon: {
    height: 40,
    width: 40,
  },
});

// TODO: Proptypes
