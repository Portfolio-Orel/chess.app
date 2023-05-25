import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Dimensions,
  StyleSheet,
  View,
  PanResponder,
  Animated,
  Text,
} from "react-native";

import useData from "../hooks/useData";

import {
  handleAddEventParticipant,
  handleDeleteEventParticipant,
} from "../redux/actions/eventsParticipants";

import EventDate from "./EventDate";
import TimeControl from "./TimeControl";
import { hideBottomSheet } from "../redux/actions/bottomSheet";
import { ActivityIndicator, Button } from "react-native-paper";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function BottomSheet() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.bottomSheetState);
  const data = useData();

  const [event, setEvent] = useState({});
  const [game, setGame] = useState({});
  const [gameFormat, setGameFormat] = useState({});

  const pan = useRef(new Animated.Value(0)).current;
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy < 0) return;
        pan.setValue(gestureState.dy);
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > SCREEN_HEIGHT / 3) {
          dispatch(hideBottomSheet());
        } else {
          Animated.timing(pan, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  useEffect(() => {
    if (state.event_id) {
      const event = data.events.find((event) => event.id === state.event_id);
      const game = data.games.find((game) => game.id === event.game_id);
      const gameFormat = data.gameFormats.find(
        (gameFormat) => gameFormat.id === event.game_format_id
      );
      setEvent(event);
      setGame(game);
      setGameFormat(gameFormat);
    }

    if (state.show) {
      Animated.timing(pan, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(pan, {
        toValue: SCREEN_HEIGHT,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [state.show]);

  const Line = () => <View style={styles.line} />;

  const EventDetails = () => (
    <View style={{ width: "100%", paddingHorizontal: 20 }}>
      <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
        {event?.name}
      </Text>
      <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
        {event?.description}
      </Text>
      {event && <EventDate event={event} />}
      {game && <TimeControl game={game} />}
      <Button
        mode="contained"
        buttonColor={event.isUserRegistered ? "transparent" : "green"}
        textColor={event.isUserRegistered ? "white" : "black"}
        style={{ marginTop: 20 }}
        contentStyle={{ fontSize: 18 }}
        onPress={() => {
          if (event.isUserRegistered) {
            dispatch(handleDeleteEventParticipant(event?.id, true));
          } else {
            dispatch(handleAddEventParticipant(event?.id, true));
          }
        }}
      >
        {data.eventsParticipantsState.event_id_loading === event?.id ? (
          <ActivityIndicator color="white" />
        ) : state.isUserRegistered ? (
          "בטל רישום"
        ) : (
          "הירשם"
        )}
      </Button>
    </View>
  );

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY: pan }],
        },
      ]}
      {...panResponder.panHandlers}
    >
      <Line />
      <EventDetails />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: SCREEN_HEIGHT,
    width: "100%",
    backgroundColor: "#111",
    position: "absolute",
    top: SCREEN_HEIGHT / 4,
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    display: "flex",
    alignItems: "center",
  },
  line: {
    width: 75,
    height: 4,
    backgroundColor: "gray",
    marginVertical: 10,
    borderRadius: 10,
  },
});
