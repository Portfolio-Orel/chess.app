import axios from "axios";

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

const addEventParticipantRequest = () => ({
  type: ADD_EVENT_PARTICIPANT_REQUEST,
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

const deleteEventParticipantRequest = (id) => ({
  type: DELETE_EVENT_PARTICIPANT_REQUEST,
  payload: { id },
});

const deleteEventParticipantSuccess = (id) => ({
  type: DELETE_EVENT_PARTICIPANT_SUCCESS,
  payload: { id },
});

const deleteEventParticipantFailure = (error) => ({
  type: DELETE_EVENT_PARTICIPANT_FAILURE,
  payload: { error },
});

export const clearEventsParticipants = () => ({
  type: CLEAR_EVENT_PARTICIPANTS,
});

export const handleFetchEventsParticipants = (eventId) => async (dispatch) => {
  dispatch(fetchEventsParticipantsRequest());
  try {
    const response = await axios.get(`/api/events/${eventId}/participants`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const eventsParticipants = JSON.parse(response.data);
    dispatch(fetchEventsParticipantsSuccess(eventsParticipants));
  } catch (error) {
    dispatch(fetchEventsParticipantsFailure(error.message));
  }
};

export const handleAddEventParticipant =
  (eventId, participant) => async (dispatch) => {
    dispatch(addEventParticipantRequest());
    try {
      const response = await axios.post(`/api/events/${eventId}/participants`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(participant),
      });
      const newEventParticipant = JSON.parse(response.data);
      dispatch(addEventParticipantSuccess(newEventParticipant));
    } catch (error) {
      dispatch(addEventParticipantFailure(error.message));
    }
  };

export const handleUpdateEventParticipant =
  (eventId, participant) => async (dispatch) => {
    dispatch(updateEventParticipantRequest());
    try {
      const response = await axios.put(
        `/api/events/${eventId}/participants/${participant.id}`,
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
  (eventId, id) => async (dispatch) => {
    dispatch(deleteEventParticipantRequest());
    try {
      await axios.delete(`/api/events/${eventId}/participants/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch(deleteEventParticipantSuccess(id));
    } catch (error) {
      dispatch(deleteEventParticipantFailure(error.message));
    }
  };
