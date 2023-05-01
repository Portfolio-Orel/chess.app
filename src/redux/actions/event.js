import axios from "axios";
import { showSnackbar } from "./snackbar";
import * as api from "../../helper/api";

export const ADD_EVENT_REQUEST = "ADD_EVENT_REQUEST";
export const ADD_EVENTS_SUCCESS = "ADD_EVENTS_SUCCESS";
export const ADD_EVENT_FAILURE = "ADD_EVENT_FAILURE";

export const UPDATE_EVENT_REQUEST = "UPDATE_EVENT_REQUEST";
export const UPDATE_EVENT_SUCCESS = "UPDATE_EVENT_SUCCESS";
export const UPDATE_EVENT_FAILURE = "UPDATE_EVENT_FAILURE";

export const DELETE_EVENT_REQUEST = "DELETE_EVENT_REQUEST";
export const DELETE_EVENT_SUCCESS = "DELETE_EVENT_SUCCESS";
export const DELETE_EVENT_FAILURE = "DELETE_EVENT_FAILURE";

export const FETCH_EVENTS_REQUEST = "FETCH_EVENTS_REQUEST";
export const FETCH_EVENTS_SUCCESS = "FETCH_EVENTS_SUCCESS";
export const FETCH_EVENTS_FAILURE = "FETCH_EVENTS_FAILURE";

export const CLEAR_EVENTS = "CLEAR_EVENTS";

const addEventRequest = () => ({
  type: ADD_EVENT_REQUEST,
});

const addEventsSuccess = (event) => ({
  type: ADD_EVENTS_SUCCESS,
  payload: {
    event,
  },
});

const addEventFailure = (error) => ({
  type: ADD_EVENT_FAILURE,
  payload: {
    error,
  },
});

const updateEventRequest = (event) => ({
  type: UPDATE_EVENT_REQUEST,
  payload: {
    event,
  },
});

const updateEventSuccess = (event) => ({
  type: UPDATE_EVENT_SUCCESS,
  payload: {
    event,
  },
});

const updateEventFailure = (error) => ({
  type: UPDATE_EVENT_FAILURE,
  payload: {
    error,
  },
});

const deleteEventRequest = (id) => ({
  type: DELETE_EVENT_REQUEST,
  payload: {
    id,
  },
});

const deleteEventSuccess = (id) => ({
  type: DELETE_EVENT_SUCCESS,
  payload: {
    id,
  },
});

const deleteEventFailure = (error) => ({
  type: DELETE_EVENT_FAILURE,
  payload: {
    error,
  },
});

const fetchEventsRequest = () => ({
  type: FETCH_EVENTS_REQUEST,
});

const fetchEventsSuccess = (events) => ({
  type: FETCH_EVENTS_SUCCESS,
  payload: {
    events,
  },
});

const fetchEventsFailure = (error) => ({
  type: FETCH_EVENTS_FAILURE,
  payload: {
    error,
  },
});

const clearEvents = () => ({
  type: CLEAR_EVENTS,
});

export const handleFetchEvents = () => async (dispatch) => {
  dispatch(fetchEventsRequest());
  try {
    // const response = await axios.get("/api/events", { 
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    // api.init("");
    const events = await api.fetchEvents();
    dispatch(fetchEventsSuccess(events));
  } catch (error) {
    dispatch(fetchEventsFailure(error.message));
  }
};

export const handleDeleteEvent = (id) => async (dispatch) => {
  dispatch(deleteEventRequest(id));
  try {
    const response = await axios.delete(`/api/events/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const event = JSON.parse(response.data);
    dispatch(deleteEventSuccess(event.id));
  } catch (error) {
    dispatch(deleteEventFailure(error.message));
  }
};

export const handleAddEvent = (eventData) => async (dispatch) => {
  dispatch(addEventRequest());
  try {
    const response = await axios.post("/api/events", eventData, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const event = JSON.parse(response.data);
    dispatch(addEventsSuccess(event));
    dispatch(showSnackbar("Event added successfully", "success"));
  } catch (error) {
    dispatch(showSnackbar("Event add failed", "error"));
    dispatch(addEventFailure(error.message));
  }
};

export const handleUpdateEvent = (eventData) => async (dispatch) => {
  dispatch(updateEventRequest(eventData));
  try {
    const response = await axios.put(`/api/events/${eventData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    });
    const event = JSON.parse(response.data);
    dispatch(updateEventSuccess(event));
  } catch (error) {
    dispatch(updateEventFailure(error.message));
  }
};

export const handleClearEvents = () => async (dispatch) => {
  dispatch(clearEvents());
};
