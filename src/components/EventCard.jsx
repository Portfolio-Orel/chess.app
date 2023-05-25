import React, { useEffect, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Animated,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import useData from "../hooks/useData";
import { FAB } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import Loading from "./Loading";

import {
  handleAddEventParticipant,
  handleDeleteEventParticipant,
} from "../redux/actions/eventsParticipants";

import EventDate from "./EventDate";
import TimeControl from "./TimeControl";

import { showBottomSheet } from "../redux/actions/bottomSheet";

import BulletIcon from "../assets/images/chess_icons/bullet.png";
import BlitzIcon from "../assets/images/chess_icons/blitz.png";
import RapidIcon from "../assets/images/chess_icons/rapid.png";
import { Image } from "react-native-web";

export default function EventComponent({ event, ...props }) {
  const dispatch = useDispatch();
  const data = useData();

  const [game, setGame] = useState({});
  const [gameFormat, setGameFormat] = useState({});

  useEffect(() => {
    const game = data.games?.find((game) => game.id === event.game_id);
    const gameFormat = data.gameFormats.find(
      (gameFormat) => gameFormat.id === event.game_format_id
    );
    setGame(game);
    setGameFormat(gameFormat);
  }, [data.games, data.gameFormats, event.game_id, event.game_format_id]);

  const getGameIcon = () => {
    switch (game?.type?.toLowerCase()) {
      case "bullet":
        return BulletIcon;
      case "blitz":
        return BlitzIcon;
      case "rapid":
        return RapidIcon;
      default:
        return BulletIcon;
    }
  };

  const handleCardPress = () => dispatch(showBottomSheet(event.id));

  const DateComponent = (style) => (
    <View style={[styles.gridItem, { flex: 20, height: "100%" }, style]}>
      <EventDate event={event} />
    </View>
  );

  const EventCard = () => (
    <View style={[styles.gridItem, { flex: 1 }]}>
      <TouchableOpacity onPress={handleCardPress} style={styles.flex1}>
        <View
          {...props}
        >
          <View style={styles.contentContainer}>
            <View style={styles.gameDetails}>
              <View style={styles.gameInformation}>
                <Text style={styles.eventName}>{event.name}</Text>
                <TimeControl game={game} />
              </View>
              {/* <View style={styles.iconContainer}>
                <Image source={getGameIcon()} style={styles.gameIcon} />
              </View> */}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  const RegisterButton = () => (
    <View style={[styles.gridItem, { flex: 20, height: "100%" }]}>
      <FAB
        style={[
          styles.registerButton,
          event.isUserRegistered ? styles.registeredColor : styles.notRegisteredColor,
        ]}
        animated={false}
        icon={({ size, color }) =>
          data.eventsParticipantsState.event_id_loading === event.id ? (
            <Loading color={color} />
          ) : (
            <Icon
              name={event.isUserRegistered ? "check" : "plus"}
              size={size}
              color="white"
            />
          )
        }
        onPress={() => {
          if (data.eventsParticipantsState.event_id_loading === event.id)
            return;
          if (event.isUserRegistered) {
            dispatch(handleDeleteEventParticipant(event.id, true));
          } else {
            dispatch(handleAddEventParticipant(event.id, true));
          }
        }}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <DateComponent />
      <EventCard />
      <RegisterButton />
    </View>
  );
}

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  container: {
    width: "100%",
    marginBottom: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  gridItem: {
    width: 0,
    flexGrow: 1,
  },
  cardContainer: {
    width: "100%",
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 4,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    height: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    gap: 15,
  },
  gameDateContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  gameInformation: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
  gameDate: {
    fontSize: 24,
    color: "#000",
    marginTop: 8,
  },
  gameDetails: {
    height: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  eventName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  iconContainer: {},
  gameIcon: {},
  registerButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
    borderRadius: 55,
    marginBottom: 10,
  },
  registeredColor: {
    backgroundColor: "#57e954",
  },
  notRegisteredColor: {
    backgroundColor: "gray",
  },
  eventDetailsContainer: {
    backgroundColor: "#00fa21",
    width: "100%",
    height: "100%",
  },
  eventDetails: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
  },
  eventDetailsText: {
    fontSize: 22,
    color: "#fff",
  },
});
