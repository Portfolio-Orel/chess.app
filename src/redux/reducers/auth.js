import {
  CHECK_AUTH_STATE_REQUEST,
  CHECK_AUTH_STATE_DONE,
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
  CONFIRM_SIGN_IN_REQUEST,
  CONFIRM_SIGN_IN_SUCCESS,
  CONFIRM_SIGN_IN_FAILURE,
  REGISTER_USER_DETAILS_REQUEST,
  REGISTER_USER_DETAILS_SUCCESS,
  REGISTER_USER_DETAILS_FAILURE,
} from "../actions/auth";

import states from "../../constants/states";

const initialState = {
  user: null,
  state: states.unauthorized,
  isLoading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHECK_AUTH_STATE_REQUEST:
      return { ...state, isLoading: true, error: null };
    case CHECK_AUTH_STATE_DONE:
      return { ...state, isLoading: false, error: action.error };
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
        state: states.unauthorized,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.user,
        state: states.sign_in_confirmation_required,
      };
    case LOGIN_FAILURE:
      return { ...state, isLoading: false, error: action.error };
    case LOGOUT:
      return { ...state, user: null };
    case REGISTER_REQUEST:
      return { ...state, isLoading: true, error: null };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: { ...action.user, state: states.sign_up_confirmation_required },
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        user: { ...state.user },
      };
    case CONFIRM_SIGN_UP_REQUEST:
      return { ...state, isLoading: true, error: null };
    case CONFIRM_SIGN_UP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: { ...state.user, state: states.authorized },
      };
    case CONFIRM_SIGN_UP_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        user: { ...state.user },
      };
    case CONFIRM_SIGN_IN_REQUEST:
      return { ...state, isLoading: true, error: null };
    case CONFIRM_SIGN_IN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: { ...state.user, state: states.authorized },
      };
    case CONFIRM_SIGN_IN_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        user: { ...state.user },
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
