import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useSelector } from "react-redux";

export default function EventCard({
  event,
  game,
  gameFormat,
  participants,
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
      {isUserRegistered ? "" : <View style={styles.registeredBar} />}
      <View style={styles.contentContainer}>
        <Text>Hello there!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: "auto",
    position: "relative",
    display: "flex",
    flexDirection: "row",
    // padding: 20,
    borderRadius: 4,
    backgroundColor: "#fff",
  },
  registeredBar: {
    position: "absolute",
    height: "100%",
    width: 3,
    backgroundColor: "#00ff00",
    borderTopStartRadius: 4,
    borderBottomStartRadius: 4,
    start: 0,
    top: 0,
  },
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 10,
  },
});

// TODO: Proptypes
