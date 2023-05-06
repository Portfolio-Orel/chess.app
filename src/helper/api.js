import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000",
  // baseURL: "http://10.0.2.2:4000",
  // baseURL: " https://0j3kvj5lpl.execute-api.us-east-1.amazonaws.com/",
  "Content-Type": "application/json",
});

const init = (userId, token) => {
  api.defaults.headers.common["UserId"] = userId;
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

const registerToEvent = async (eventId) => {
  try {
    return await api.post(`/events/${eventId}/register`);
  } catch (error) {
    throw error;
  }
};

const createUser = async (user) => {
  try {
    console.log("user", user);
    api.defaults.headers.common["userid"] = user.id;
    const response = await api.post(
      "/users",
      {
        user_id: user.id,
        email: user.email,
        phone_number: user.phoneNumber,
      },
      {
        headers: {
          UserId: user.id,
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
  fetchGameFormats,
  fetchGames,
  fetchIntervals,
  createUser,
};
