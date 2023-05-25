import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:4000",
  // baseURL: "http://10.0.2.2:4000",
  baseURL: "https://0j3kvj5lpl.execute-api.us-east-1.amazonaws.com/",
  "Content-Type": "application/json",
});

const init = (user_id, token, clubId) => {
  api.defaults.headers.common["UserId"] = user_id;
  api.defaults.headers.common["ClubId"] = clubId;
  api.defaults.headers.common["Authorization"] = token;
};

const fetchEvents = async () => {
  try {
    const response = await api.get("/events");
    const events = response.data;
    return events;
  } catch (error) {
    throw error;
  }
};

const fetchEventsParticipants = async () => {
  try {
    const response = await api.get(`/participants`);
    const eventsParticipants = response.data;
    return eventsParticipants;
  } catch (error) {
    throw error;
  }
};

const fetchGameFormats = async () => {
  try {
    const response = await api.get("/gameFormats");
    const gameFormats = response.data;
    return gameFormats;
  } catch (error) {
    throw error;
  }
};

const fetchGames = async () => {
  try {
    const response = await api.get("/games");
    const games = response.data;
    return games;
  } catch (error) {
    throw error;
  }
};

const fetchIntervals = async () => {
  try {
    const response = await api.get("/intervals");
    const intervals = response.data;
    return intervals;
  } catch (error) {
    throw error;
  }
};

const fetchClubs = async () => {
  try {
    const response = await api.get("/clubs");
    const clubs = response.data;
    return clubs;
  } catch (error) {
    throw error;
  }
};

const registerToEvent = async (event_id) => {
  try {
    return await api.post(`/events/${event_id}/register`);
  } catch (error) {
    throw error;
  }
};

const unregisterFromEvent = async (event_id) => {
  try {
    return await api.post(`/events/${event_id}/unregister`);
  } catch (error) {
    throw error;
  }
};

const completeRegistration = async (
  firstName,
  lastName,
  playerNumber,
  clubId
) => {
  try {
    await api.put(`/users/completeRegistration`, {
      first_name: firstName,
      last_name: lastName,
      player_number: playerNumber,
      club_id: clubId,
    });
  } catch (error) {
    throw error;
  }
};

const createUser = async (user) => {
  try {
    const response = await api.post(
      "/users",
      {
        user_id: user.id,
        email: user.email,
        phone_number: user.phoneNumber,
      },
      {
        headers: {
          user_id: user.id,
        },
      }
    );
    const createdUser = response.data;
    return createdUser;
  } catch (error) {
    throw error;
  }
};

export {
  init,
  fetchEvents,
  registerToEvent,
  fetchEventsParticipants,
  fetchGameFormats,
  fetchGames,
  fetchIntervals,
  createUser,
  unregisterFromEvent,
  completeRegistration,
  fetchClubs,
};
