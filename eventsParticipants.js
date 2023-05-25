import axios from "axios";
import {
  registerToEvent,
  fetchEventsParticipants,
  unregisterFromEvent,
} from "./src/helper/api";

import { showSnackbar } from "./src/redux/actions/snackbar";

export const FETCH_EVENT_PARTICIPANTS_REQUEST =
  "FETCH_EVENT_PARTICIPANTS_REQUEST";
export const FETCH_EVENT_PARTICIPANTS_SUCCESS =
  "FETCH_EVENT_PARTICIPANTS_SUCCESS";
export const FETCH_EVENT_PARTICIPANTS_FAILURE =
  "FETCH_EVENT_PARTICIPANTS_FAILURE";

export const ADD_EVENT_PARTICIPANT_REQUEST = "ADD_EVENT_PARTICIPANT_REQUEST";
export const ADD_EVENT_PARTICIPANT_SUCCESS = "ADD_EVENT_PARTICIPANT_SUCCESS";
export const ADD_EVENT_PARTICIPANT_FAILURE = "ADD_EVENT_PARTICIPANT_FAILURE";

export const UPDATE_EVENT_PARTICIPANT_REQUEST =
  "UPDATE_EVENT_PARTICIPANT_REQUEST";
export const UPDATE_EVENT_PARTICIPANT_SUCCESS =
  "UPDATE_EVENT_PARTICIPANT_SUCCESS";
export const UPDATE_EVENT_PARTICIPANT_FAILURE =
  "UPDATE_EVENT_PARTICIPANT_FAILURE";

export const DELETE_EVENT_PARTICIPANT_REQUEST =
  "DELETE_EVENT_PARTICIPANT_REQUEST";
export const DELETE_EVENT_PARTICIPANT_SUCCESS =
  "DELETE_EVENT_PARTICIPANT_SUCCESS";
export const DELETE_EVENT_PARTICIPANT_FAILURE =
  "DELETE_EVENT_PARTICIPANT_FAILURE";

export const CLEAR_EVENT_PARTICIPANTS = "CLEAR_EVENT_PARTICIPANTS";

const fetchEventsParticipantsRequest = () => ({
  type: FETCH_EVENT_PARTICIPANTS_REQUEST,
});

const fetchEventsParticipantsSuccess = (eventsParticipants) => ({
  type: FETCH_EVENT_PARTICIPANTS_SUCCESS,
  payload: { eventsParticipants },
});

const fetchEventsParticipantsFailure = (error) => ({
  type: FETCH_EVENT_PARTICIPANTS_FAILURE,
  payload: { error },
});

const addEventParticipantRequest = (event_id) => ({
  type: ADD_EVENT_PARTICIPANT_REQUEST,
  payload: { event_id },
});

const addEventParticipantSuccess = (eventParticipant) => ({
  type: ADD_EVENT_PARTICIPANT_SUCCESS,
  payload: { eventParticipant },
});

const addEventParticipantFailure = (error) => ({
  type: ADD_EVENT_PARTICIPANT_FAILURE,
  payload: { error },
});

const updateEventParticipantRequest = (eventParticipant) => ({
  type: UPDATE_EVENT_PARTICIPANT_REQUEST,
  payload: { eventParticipant },
});

const updateEventParticipantSuccess = (eventParticipant) => ({
  type: UPDATE_EVENT_PARTICIPANT_SUCCESS,
  payload: { eventParticipant },
});

const updateEventParticipantFailure = (error) => ({
  type: UPDATE_EVENT_PARTICIPANT_FAILURE,
  payload: { error },
});

const deleteEventParticipantRequest = (event_id) => ({
  type: DELETE_EVENT_PARTICIPANT_REQUEST,
  payload: { event_id },
});

const deleteEventParticipantSuccess = (event_id) => ({
  type: DELETE_EVENT_PARTICIPANT_SUCCESS,
  payload: { event_id },
});

const deleteEventParticipantFailure = (error) => ({
  type: DELETE_EVENT_PARTICIPANT_FAILURE,
  payload: { error },
});

export const clearEventsParticipants = () => ({
  type: CLEAR_EVENT_PARTICIPANTS,
});

export const handleFetchEventsParticipants = () => async (dispatch) => {
  dispatch(fetchEventsParticipantsRequest());
  try {
    const eventsParticipants = await fetchEventsParticipants();
    dispatch(fetchEventsParticipantsSuccess(eventsParticipants));
  } catch (error) {
    dispatch(fetchEventsParticipantsFailure(error.message));
  }
};

export const handleAddEventParticipant =
  (event_id, show_snackbar = false) =>
  async (dispatch) => {
    dispatch(addEventParticipantRequest(event_id));
    try {
      const response = await registerToEvent(event_id);
      const newEventParticipant = response.data;
      if (show_snackbar) {
        dispatch(showSnackbar("נרשמת בהצלחה!", "success"));
      }
      dispatch(addEventParticipantSuccess(newEventParticipant));
    } catch (error) {
      console.log(error);
      dispatch(showSnackbar("קרתה תקלה", "error"));
      dispatch(addEventParticipantFailure(error.message));
    }
  };

export const handleUpdateEventParticipant =
  (event_id, participant) => async (dispatch) => {
    dispatch(updateEventParticipantRequest());
    try {
      const response = await axios.put(
        `/api/events/${event_id}/participants/${participant.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(participant),
        }
      );
      const updatedEventParticipant = JSON.parse(response.data);
      dispatch(updateEventParticipantSuccess(updatedEventParticipant));
    } catch (error) {
      dispatch(updateEventParticipantFailure(error.message));
    }
  };

export const handleDeleteEventParticipant =
  (event_id, show_snackbar = false) =>
  async (dispatch) => {
    try {
      dispatch(deleteEventParticipantRequest(event_id));
      await unregisterFromEvent(event_id);
      if (show_snackbar) {
        dispatch(showSnackbar("הרישום בוטל!", "success"));
      }
      dispatch(deleteEventParticipantSuccess(event_id));
    } catch (error) {
      dispatch(showSnackbar("קרתה תקלה", "error"));
      dispatch(deleteEventParticipantFailure(error.message));
    }
  };
