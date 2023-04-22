import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  CONFIRM_SIGN_UP_REQUEST,
  CONFIRM_SIGN_UP_SUCCESS,
  CONFIRM_SIGN_UP_FAILURE,
  REGISTER_USER_DETAILS_REQUEST,
  REGISTER_USER_DETAILS_SUCCESS,
  REGISTER_USER_DETAILS_FAILURE,
} from "../actions/auth";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, isLoading: true, error: null };
    case LOGIN_SUCCESS:
      return { ...state, isLoading: false, user: action.user };
    case LOGIN_FAILURE:
      return { ...state, isLoading: false, error: action.error };
    case LOGOUT:
      return { ...state, user: null };
    case REGISTER_REQUEST:
      return { ...state, isLoading: true, error: null };
    case REGISTER_SUCCESS:
      return { ...state, isLoading: false, user: action.user };
    case REGISTER_FAILURE:
      return { ...state, isLoading: false, error: action.error };
    case CONFIRM_SIGN_UP_REQUEST:
      return { ...state, isLoading: true, error: null };
    case CONFIRM_SIGN_UP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: { ...state.user, isConfirmed: true },
      };
    case CONFIRM_SIGN_UP_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        user: { ...state.user, isConfirmed: false },
      };
    case REGISTER_USER_DETAILS_REQUEST:
      return { ...state, isLoading: true, error: null };
    case REGISTER_USER_DETAILS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: { ...state.user, ...action.user, isRegistrationCompleted: true },
      };
    case REGISTER_USER_DETAILS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        isRegistrationCompleted: false,
      };
    default:
      return state;
  }
};

export default authReducer;
