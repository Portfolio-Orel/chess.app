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
import { getMonthName, getDayOfMonth } from "../utils/dateUtils";
import { FAB } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import Loading from "./Loading";

import {
  handleAddEventParticipant,
  handleDeleteEventParticipant,
} from "../redux/actions/eventsParticipants";

import BulletIcon from "../assets/images/chess_icons/bullet.png";
import BlitzIcon from "../assets/images/chess_icons/blitz.png";
import RapidIcon from "../assets/images/chess_icons/rapid.png";
import { Image } from "react-native-web";

export default function EventComponent({ event, ...props }) {
  const dispatch = useDispatch();
  const data = useData();
  const authState = useSelector((state) => state.authState);

  const [game, setGame] = useState({});
  const [gameFormat, setGameFormat] = useState({});
  const [isUserRegistered, setIsUserRegistered] = useState(false);

  const animatedHeight = useRef(new Animated.Value(80)).current;
  const isExpanded = useRef(false);

  useEffect(() => {
    const game = data.games?.find((game) => game.id === event.game_id);
    const gameFormat = data.gameFormats.find(
      (gameFormat) => gameFormat.id === event.game_format_id
    );
    setGame(game);
    setGameFormat(gameFormat);
    if (game && gameFormat) {
      console.log(game, gameFormat, event);
    }
  }, [data.games, data.gameFormats, event.game_id, event.game_format_id]);

  useEffect(() => {
    if (authState.user) {
      const userParticipant =
        data.eventsParticipantsState.eventsParticipants.find(
          (participant) =>
            participant.user_id === authState.user.id &&
            participant.event_id === event.id
        );
      setIsUserRegistered(userParticipant ? true : false);
    }
  }, [authState, data.eventsParticipantsState]);

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

  const handleCardPress = () => {
    if (isExpanded.current) {
      Animated.timing(animatedHeight, {
        toValue: 80,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(animatedHeight, {
        toValue: 180,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
    isExpanded.current = !isExpanded.current;
  };

  const TimeContainer = () => (
    <View>
      <Text>
        {game?.time_start_min}
        {game?.increment_before_time_control_sec
          ? `+ ${game?.increment_before_time_control_sec}`
          : ""}
      </Text>
    </View>
  );

  const DateComponent = () => (
    <View style={styles.gameDateContainer}>
      <Text style={styles.gameDate}>{getDayOfMonth(event.date)}</Text>
      <Text style={styles.gameDate}>{getMonthName(event.date)}</Text>
    </View>
  );

  const EventCard = () => (
    <TouchableOpacity onPress={handleCardPress} style={styles.flex1}>
      <Animated.View
        style={[styles.cardContainer, { height: animatedHeight }]}
        {...props}
      >
        <View style={styles.contentContainer}>
          <View style={styles.gameDetails}>
            <View style={styles.gameInformation}>
              <Text style={styles.eventName}>{event.name}</Text>
              {isExpanded.current && <Text>{event.description}</Text>}
              <TimeContainer />
            </View>
            <View style={styles.iconContainer}>
              <Image source={getGameIcon()} style={styles.gameIcon} />
            </View>
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );

  const RegisterButton = () => (
    <FAB
      style={[
        styles.registerButton,
        isUserRegistered ? styles.registeredColor : styles.notRegisteredColor,
      ]}
      animated={false}
      icon={({ size, color }) =>
        data.eventsParticipantsState.event_id_loading === event.id ? (
          <Loading color={color} />
        ) : (
          <Icon
            name={isUserRegistered ? "check" : "plus"}
            size={size}
            color="white"
          />
        )
      }
      onPress={() => {
        if (data.eventsParticipantsState.event_id_loading === event.id) return;
        if (isUserRegistered) {
          dispatch(handleDeleteEventParticipant(event.id, true));
        } else {
          dispatch(handleAddEventParticipant(event.id, true));
        }
      }}
    />
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
  cardContainer: {
    flex: 1,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 4,
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
    borderRadius: 50,
  },
  registeredColor: {
    backgroundColor: "#57e954",
  },
  notRegisteredColor: {
    backgroundColor: "gray",
  },
});
