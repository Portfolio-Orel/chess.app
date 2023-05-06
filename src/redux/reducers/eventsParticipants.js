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
  error: null,
};

const eventsParticipantsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EVENT_PARTICIPANTS_REQUEST:
    case ADD_EVENT_PARTICIPANT_REQUEST:
    case UPDATE_EVENT_PARTICIPANT_REQUEST:
    case DELETE_EVENT_PARTICIPANT_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_EVENT_PARTICIPANTS_SUCCESS:
      return {
        ...state,
        loading: false,
        eventParticipants: action.payload.eventParticipants,
      };
    case ADD_EVENT_PARTICIPANT_SUCCESS:
      return {
        ...state,
        loading: false,
        eventParticipants: [
          ...state.eventsParticipants,
          action.payload.eventParticipant,
        ],
      };
    case UPDATE_EVENT_PARTICIPANT_SUCCESS:
      return {
        ...state,
        loading: false,
        eventParticipants: state.eventsParticipants.map((eventParticipant) =>
          eventParticipant.id === action.payload.eventParticipant.id
            ? action.payload.eventParticipant
            : eventParticipant
        ),
      };
    case DELETE_EVENT_PARTICIPANT_SUCCESS:
      return {
        ...state,
        loading: false,
        eventParticipants: state.eventsParticipants.filter(
          (eventParticipant) => eventParticipant.id !== action.payload.id
        ),
      };

    case FETCH_EVENT_PARTICIPANTS_FAILURE:
    case ADD_EVENT_PARTICIPANT_FAILURE:
    case UPDATE_EVENT_PARTICIPANT_FAILURE:
    case DELETE_EVENT_PARTICIPANT_FAILURE:
      return { ...state, loading: false, error: action.payload.error };

    case CLEAR_EVENT_PARTICIPANTS:
      return { ...state, eventParticipants: [] };

    default:
      return state;
  }
};

export default eventsParticipantsReducer;
