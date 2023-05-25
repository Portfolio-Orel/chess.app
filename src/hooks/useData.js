import { useEffect, useState } from "react";

import { handleFetchEvents } from "../redux/actions/event";
import { handleFetchGameFormats } from "../redux/actions/gameFormats";
import { handleFetchGames } from "../redux/actions/games";
import { handleFetchEventsParticipants } from "../redux/actions/eventsParticipants";
import { handleFetchClubs } from "../redux/actions/clubs";

import { useDispatch, useSelector } from "react-redux";

export default function () {
  const dispatch = useDispatch();

  const authState = useSelector((state) => state.authState);
  const eventsState = useSelector((state) => state.eventsState);
  const gamesState = useSelector((state) => state.gamesState);
  const gameFormatsState = useSelector((state) => state.gameFormatsState);
  const clubsState = useSelector((state) => state.clubsState);
  const eventsParticipantsState = useSelector(
    (state) => state.eventsParticipantsState
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [events, setEvents] = useState([]);
  const [games, setGames] = useState([]);
  const [gameFormats, setGameFormats] = useState([]);
  const [eventsParticipants, setEventsParticipants] = useState([]);
  const [clubs, setClubs] = useState([]);

  const fetch = () => {
    if (!eventsState.loading) {
      dispatch(handleFetchEvents());
    }
    if (!gameFormatsState.loading) {
      dispatch(handleFetchGameFormats());
    }
    if (!gamesState.loading) {
      dispatch(handleFetchGames());
    }
    if (!eventsParticipantsState.loading) {
      dispatch(handleFetchEventsParticipants());
    }
    if (!clubsState.loading) {
      dispatch(handleFetchClubs());
    }
  };

  useEffect(() => {
    if (
      eventsState.loading ||
      gamesState.loading ||
      gameFormatsState.loading ||
      eventsParticipantsState.loading ||
      clubsState.loading
    ) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [
    eventsState.loading,
    gamesState.loading,
    gameFormatsState.loading,
    eventsParticipantsState.loading,
    clubsState.loading,
  ]);

  useEffect(() => {
    if (eventsState.events) {
      setEvents(eventsState.events);
    }
    if (eventsState.error && !error) {
      setError(eventsState.error);
    }
  }, [eventsState]);

  useEffect(() => {
    if (gamesState.games) {
      setGames(gamesState.games);
    }
    if (gamesState.error && !error) {
      setError(gamesState.error);
    }
  }, [gamesState]);

  useEffect(() => {
    if (gameFormatsState.gameFormats) {
      setGameFormats(gameFormatsState.gameFormats);
    }
    if (gameFormatsState.error && !error) {
      setError(gameFormatsState.error);
    }
  }, [gameFormatsState.gameFormats]);

  useEffect(() => {
    if (eventsParticipantsState.eventsParticipants) {
      setEventsParticipants(eventsParticipantsState.eventsParticipants);
    }
    if (eventsParticipantsState.error && !error) {
      setError(eventsParticipantsState.error);
    }
  }, [eventsParticipantsState]);

  useEffect(() => {
    if (clubsState.clubs) {
      setClubs(clubsState.clubs);
    }
    if (clubsState.error && !error) {
      setError(clubsState.error);
    }
  }, [clubsState]);

  // Go over all events and set isUserRegistered to true if user is registered to that event
  useEffect(() => {
    if (
      authState.user &&
      eventsParticipantsState.eventsParticipants &&
      eventsParticipantsState.event_id_loading === null
    ) {
      let eventsParticipants = eventsParticipantsState.eventsParticipants;
      let currentEvents = eventsState.events;
      let user = authState.user;
      currentEvents?.forEach((event) => (event.isUserRegistered = false));
      eventsParticipants.forEach((eventParticipant) => {
        currentEvents.forEach((event) => {
          if (eventParticipant.event_id === event.id) {
            if (eventParticipant.user_id === user.id) {
              event.isUserRegistered = true;
            } else {
              event.isUserRegistered = false;
            }
          }
        });
      });
      setEvents(currentEvents);
    }
  }, [
    authState.user,
    eventsParticipantsState.eventsParticipants,
    eventsState.events,
  ]);

  return {
    fetch,
    loading,
    error,
    events,
    games,
    gameFormats,
    eventsParticipants,
    clubs,
    eventsParticipantsState,
  };
}
