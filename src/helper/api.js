import axios from "axios";
import StubData from "../constants/stub";

const api = axios.create({
  // baseURL: "http://localhost:4000",
  baseURL: "http://10.0.2.2:4000",
  "Content-Type": "application/json",
});

const init = (userId) => {
  if (api.defaults.headers.common["userid"] === undefined) {
    api.defaults.headers.common["userid"] = userId;
  }
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
    await api.post(`/events/${eventId}/register`);
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
};
