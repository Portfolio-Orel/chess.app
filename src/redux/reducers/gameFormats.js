import {
  FETCH_GAME_FORMATS_REQUEST,
  FETCH_GAME_FORMATS_SUCCESS,
  FETCH_GAME_FORMATS_FAILURE,
} from "../actions/gameFormats";
import {
  ADD_GAME_FORMAT_REQUEST,
  ADD_GAME_FORMAT_SUCCESS,
  ADD_GAME_FORMAT_FAILURE,
} from "../actions/gameFormats";
import {
  UPDATE_GAME_FORMAT_REQUEST,
  UPDATE_GAME_FORMAT_SUCCESS,
  UPDATE_GAME_FORMAT_FAILURE,
} from "../actions/gameFormats";
import {
  DELETE_GAME_FORMAT_REQUEST,
  DELETE_GAME_FORMAT_SUCCESS,
  DELETE_GAME_FORMAT_FAILURE,
} from "../actions/gameFormats";

import { CLEAR_GAME_FORMATS } from "../actions/gameFormats";

const initialState = {
  gameFormats: [],
  loading: false,
  error: null,
};

const gameFormatsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_GAME_FORMATS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_GAME_FORMATS_SUCCESS:
      return {
        ...state,
        loading: false,
        gameFormats: action.payload.gameFormats,
      };
    case FETCH_GAME_FORMATS_FAILURE:
      return { ...state, loading: false, error: action.payload.error };

    case ADD_GAME_FORMAT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        gameFormats: [...state.gameFormats, action.payload.gameFormat],
      };
    case ADD_GAME_FORMAT_SUCCESS:
      return {
        ...state,
        loading: false,
        gameFormats: state.gameFormats.concat(action.payload.gameFormat),
      };
    case ADD_GAME_FORMAT_FAILURE:
      return { ...state, loading: false, error: action.payload.error };

    case UPDATE_GAME_FORMAT_REQUEST:
      return { ...state, loading: true, error: null };
    case UPDATE_GAME_FORMAT_SUCCESS:
      return {
        ...state,
        loading: false,
        gameFormats: state.gameFormats.map((gameFormat) =>
          gameFormat.id === action.payload.gameFormat.id
            ? action.payload.gameFormat
            : gameFormat
        ),
      };
    case UPDATE_GAME_FORMAT_FAILURE:
      return { ...state, loading: false, error: action.payload.error };

    case DELETE_GAME_FORMAT_REQUEST:
      return { ...state, loading: true, error: null };
    case DELETE_GAME_FORMAT_SUCCESS:
      return {
        ...state,
        loading: false,
        gameFormats: state.gameFormats.filter(
          (gameFormat) => gameFormat.id !== action.payload.gameFormat.id
        ),
      };
    case DELETE_GAME_FORMAT_FAILURE:
      return { ...state, loading: false, error: action.payload.error };

    case CLEAR_GAME_FORMATS:
      return { ...state, gameFormats: [] };

    default:
      return state;
  }
};

export default gameFormatsReducer;
