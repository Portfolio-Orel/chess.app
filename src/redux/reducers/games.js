import {
  FETCH_GAMES_REQUEST,
  FETCH_GAMES_SUCCESS,
  FETCH_GAMES_FAILURE,
} from "../actions/games";
import {
  ADD_GAME_REQUEST,
  ADD_GAME_SUCCESS,
  ADD_GAME_FAILURE,
} from "../actions/games";
import {
  UPDATE_GAME_REQUEST,
  UPDATE_GAME_SUCCESS,
  UPDATE_GAME_FAILURE,
} from "../actions/games";
import {
  DELETE_GAME_REQUEST,
  DELETE_GAME_SUCCESS,
  DELETE_GAME_FAILURE,
} from "../actions/games";

import { CLEAR_GAMES } from "../actions/games";

const initialState = {
  games: [],
  loading: false,
  error: null,
};

const gamesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_GAMES_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_GAMES_SUCCESS:
      return { ...state, loading: false, games: action.payload.games };
    case FETCH_GAMES_FAILURE:
      return { ...state, loading: false, error: action.payload.error };

    case ADD_GAME_REQUEST:
      return { ...state, loading: true, error: null };
    case ADD_GAME_SUCCESS:
      return { ...state, loading: false, games: state.games.concat(action.payload.game) };
    case ADD_GAME_FAILURE:
      return { ...state, loading: false, error: action.payload.error };

    case UPDATE_GAME_REQUEST:
      return { ...state, loading: true, error: null };
    case UPDATE_GAME_SUCCESS:
      return {
        ...state,
        loading: false,
        games: state.games.map((game) =>
          game.id === action.payload.game.id ? action.payload.game : game
        ),
      };
    case UPDATE_GAME_FAILURE:
      return { ...state, loading: false, error: action.payload.error };

    case DELETE_GAME_REQUEST:
      return { ...state, loading: true, error: null };
    case DELETE_GAME_SUCCESS:
      return {
        ...state,
        loading: false,
        games: state.games.filter((game) => game.id !== action.payload.game.id),
      };
    case DELETE_GAME_FAILURE:
      return { ...state, loading: false, error: action.payload.error };

    case CLEAR_GAMES:
      return { ...state, games: [] };

    default:
      return state;
  }
};

export default gamesReducer;
