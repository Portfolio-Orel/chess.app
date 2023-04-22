import {
  FETCH_INTERVALS_REQUEST,
  FETCH_INTERVALS_SUCCESS,
  FETCH_INTERVALS_FAILURE,
} from "../actions/intervals";
import {
  ADD_INTERVAL_REQUEST,
  ADD_INTERVAL_SUCCESS,
  ADD_INTERVAL_FAILURE,
} from "../actions/intervals";
import {
  UPDATE_INTERVAL_REQUEST,
  UPDATE_INTERVAL_SUCCESS,
  UPDATE_INTERVAL_FAILURE,
} from "../actions/intervals";
import {
  DELETE_INTERVAL_REQUEST,
  DELETE_INTERVAL_SUCCESS,
  DELETE_INTERVAL_FAILURE,
} from "../actions/intervals";

import { CLEAR_INTERVALS } from "../actions/intervals";

const initialState = {
  intervals: [],
  loading: false,
  error: null,
};

const intervalsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_INTERVALS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_INTERVALS_SUCCESS:
      return { ...state, loading: false, intervals: action.payload.intervals };
    case FETCH_INTERVALS_FAILURE:
      return { ...state, loading: false, error: action.payload.error };

    case ADD_INTERVAL_REQUEST:
      return { ...state, loading: true, error: null };
    case ADD_INTERVAL_SUCCESS:
      return {
        ...state,
        loading: false,
        intervals: state.intervals.concat(action.payload.interval),
      };
    case ADD_INTERVAL_FAILURE:
      return { ...state, loading: false, error: action.payload.error };

    case UPDATE_INTERVAL_REQUEST:
      return { ...state, loading: true, error: null };
    case UPDATE_INTERVAL_SUCCESS:
      return {
        ...state,
        loading: false,
        intervals: state.intervals.map((interval) =>
          interval.id === action.payload.interval.id ? action.payload.interval : interval
        ),
      };
    case UPDATE_INTERVAL_FAILURE:
      return { ...state, loading: false, error: action.payload.error };

    case DELETE_INTERVAL_REQUEST:
      return { ...state, loading: true, error: null };
    case DELETE_INTERVAL_SUCCESS:
      return {
        ...state,
        loading: false,
        intervals: state.intervals.filter((interval) => interval.id !== action.payload.interval.id),
      };
    case DELETE_INTERVAL_FAILURE:
      return { ...state, loading: false, error: action.payload.error };

    case CLEAR_INTERVALS:
      return { ...state, intervals: [] };

    default:
      return state;
  }
};

export default intervalsReducer;
