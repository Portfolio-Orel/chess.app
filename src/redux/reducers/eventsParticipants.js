import {
  FETCH_EVENT_PARTICIPANTS_REQUEST,
  FETCH_EVENT_PARTICIPANTS_SUCCESS,
  FETCH_EVENT_PARTICIPANTS_FAILURE,
  ADD_EVENT_PARTICIPANT_REQUEST,
  ADD_EVENT_PARTICIPANT_SUCCESS,
  ADD_EVENT_PARTICIPANT_FAILURE,
  UPDATE_EVENT_PARTICIPANT_REQUEST,
  UPDATE_EVENT_PARTICIPANT_SUCCESS,
  UPDATE_EVENT_PARTICIPANT_FAILURE,
  DELETE_EVENT_PARTICIPANT_REQUEST,
  DELETE_EVENT_PARTICIPANT_SUCCESS,
  DELETE_EVENT_PARTICIPANT_FAILURE,
  CLEAR_EVENT_PARTICIPANTS,
} from "../actions/eventsParticipants";

const initialState = {
  eventsParticipants: [],
  loading: false,
  event_id_loading: null,
  error: null,
};

const eventsParticipantsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EVENT_PARTICIPANTS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_EVENT_PARTICIPANTS_SUCCESS:
      return {
        ...state,
        loading: false,
        eventsParticipants: action.payload.eventsParticipants,
      };
    case FETCH_EVENT_PARTICIPANTS_FAILURE:
      return { ...state, loading: false, error: action.payload.error };

    case ADD_EVENT_PARTICIPANT_REQUEST:
      return {
        ...state,
        error: null,
        event_id_loading: action.payload.event_id,
      };
    case ADD_EVENT_PARTICIPANT_SUCCESS:
      return {
        ...state,
        eventsParticipants: [
          ...state.eventsParticipants,
          action.payload.eventParticipant,
        ],
        event_id_loading: null,
      };
    case ADD_EVENT_PARTICIPANT_FAILURE:
      return { ...state, error: action.payload.error };

    case UPDATE_EVENT_PARTICIPANT_REQUEST:
      return { ...state, error: null };
    case UPDATE_EVENT_PARTICIPANT_SUCCESS:
      return {
        ...state,
        eventsParticipants: state.eventsParticipants.map((eventParticipant) =>
          eventParticipant.id === action.payload.eventParticipant.id
            ? action.payload.eventParticipant
            : eventParticipant
        ),
      };
    case UPDATE_EVENT_PARTICIPANT_FAILURE:
      return { ...state, error: action.payload.error };

    case DELETE_EVENT_PARTICIPANT_REQUEST:
      return {
        ...state,
        error: null,
        event_id_loading: action.payload.event_id,
      };
    case DELETE_EVENT_PARTICIPANT_SUCCESS:
      return {
        ...state,
        eventsParticipants: state.eventsParticipants.filter(
          (eventParticipant) =>
            eventParticipant.event_id !== action.payload.event_id
        ),
        event_id_loading: null,
      };

    case DELETE_EVENT_PARTICIPANT_FAILURE:
      return { ...state, error: action.payload.error, event_id_loading: null };

    case CLEAR_EVENT_PARTICIPANTS:
      return { ...state, eventsParticipants: [] };

    default:
      return state;
  }
};

export default eventsParticipantsReducer;
