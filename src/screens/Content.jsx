import React, { useEffect } from "react";
import useAuthState from "../hooks/useAuthState";
import { StyleSheet, ScrollView, FlatList } from "react-native";

import EventCard from "../components/EventCard";

import { handleFetchEvents } from "../redux/actions/event";
import { handleFetchGameFormats } from "../redux/actions/gameFormats";
import { handleFetchGames } from "../redux/actions/games";
import { handleFetchEventsParticipants } from "../redux/actions/eventsParticipants";

import { useDispatch, useSelector } from "react-redux";

export default function Content() {
  const authState = useAuthState();
  const dispatch = useDispatch();
  const eventsState = useSelector((state) => state.eventsState);
  const eventsParticipantsState = useSelector(
    (state) => state.eventsParticipantsState
  );
  const gamesState = useSelector((state) => state.gamesState);
  const gameFormatsState = useSelector((state) => {
    return state.gameFormatsState;
  });

  useEffect(() => {
    if (authState.isAuthenticated) {
      if (!eventsState.loading) {
        dispatch(handleFetchEvents());
      }
      if (!gamesState.loading) {
        dispatch(handleFetchGameFormats());
      }
      if (!gameFormatsState.loading) {
        dispatch(handleFetchGames());
      }
      if (!eventsParticipantsState.loading) {
        dispatch(handleFetchEventsParticipants());
      }
    }
  }, []);

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      overScrollMode="never"
    >
      {eventsState?.events?.slice(0, 10)?.map((event) => {
        const game = gamesState?.games?.find(
          (game) => game.id === event.gameId
        );
        const gameFormat = gameFormatsState?.gameFormats?.find(
          (gameFormat) => gameFormat.id === event.gameFormatId
        );
        const participants =
          eventsParticipantsState?.eventsParticipants?.filter(
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  flatList: {
    flex: 1,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 30,
  },
  separator: {
    height: 10,
  },
  eventCard: {
    marginHorizontal: 10,
  },
});
