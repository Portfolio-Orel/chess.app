import {
  FETCH_CLUBS_REQUEST,
  FETCH_CLUBS_SUCCESS,
  FETCH_CLUBS_FAILURE,
} from "../actions/clubs";

const initialState = {
  clubs: [],
  loading: false,
  error: null,
};

const clubsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CLUBS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_CLUBS_SUCCESS:
      return { ...state, loading: false, clubs: action.payload.clubs };
    case FETCH_CLUBS_FAILURE:
      return { ...state, loading: false, error: action.payload.error };
    default:
      return state;
  }
};

export default clubsReducer;