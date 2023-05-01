import React, { useEffect } from "react";
import useAuthState from "../hooks/useAuthState";
import { View, StyleSheet, Text } from "react-native";

import EventCard from "../components/EventCard";

import { handleFetchEvents } from "../redux/actions/event";
import { handleFetchGameFormats } from "../redux/actions/gameFormats";
import { handleFetchGames } from "../redux/actions/games";
import { handleFetchEventsParticipants } from "../redux/actions/eventsParticipants";

import { useDispatch, useSelector } from "react-redux";

export default function Content() {
  const authState = useAuthState();
  const dispatch = useDispatch();
  const events = useSelector((state) => state.eventsState.events);
  const eventsParticipants = useSelector(
    (state) => state.eventsParticipantsState.eventsParticipants
  );
  const games = useSelector((state) => state.gamesState.games);
  const gameFormats = useSelector(
    (state) => state.gameFormatsState.gameFormats
  );

  useEffect(() => {
    if (authState.isAuthenticated) {
      dispatch(handleFetchEvents());
      dispatch(handleFetchGameFormats());
      dispatch(handleFetchGames());
      dispatch(handleFetchEventsParticipants());
    }
  }, []);

  const buildEventCards = () => {
    return events.map((event) => {
      // const game = games.find((game) => game.id === event.gameId);
      // const gameFormat = gameFormats.find(
      //   (gameFormat) => gameFormat.id === event.gameFormatId
      // );
      // const participants = eventsParticipants.filter(
      //   (eventsParticipant) => eventsParticipant.eventId === event.id
      // );
      return <EventCard />;
    });
  };

  return (
    <View style={styles.container}>
      <Text>Hello {events.length}</Text>
      {events?.slice(0, 10)?.map((event) => {
        const game = games?.find((game) => game.id === event.gameId);
        const gameFormat = gameFormats?.find(
          (gameFormat) => gameFormat.id === event.gameFormatId
        );
        const participants = eventsParticipants?.filter(
          (eventsParticipant) => eventsParticipant.eventId === event.id
        );
        return (
          <EventCard
            key={event.id}
            event={event}
            game={game}
            gameFormat={gameFormat}
            participants={participants}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    display: "flex",
    gap: 2,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
  },
});
