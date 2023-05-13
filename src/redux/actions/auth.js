import { Auth } from "aws-amplify";
import { formatPhoneNumber } from "../../utils/authUtils";
import axios from "axios";
import {
  createUser,
  init as initApi,
  completeRegistration as completeRegistrationApi,
} from "../../helper/api";
import states from "../../constants/states";

export const LISTEN_TO_AUTH_STATE_CHANGE = "LISTEN_TO_AUTH_STATE_CHANGE";

export const CHECK_AUTH_STATE_REQUEST = "CHECK_AUTH_STATE_REQUEST";
export const CHECK_AUTH_STATE_DONE = "CHECK_AUTH_STATE_DONE";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

export const CONFIRM_SIGN_UP_REQUEST = "CONFIRM_SIGN_UP_REQUEST";
export const CONFIRM_SIGN_UP_SUCCESS = "CONFIRM_SIGN_UP_SUCCESS";
export const CONFIRM_SIGN_UP_FAILURE = "CONFIRM_SIGN_UP_FAILURE";

export const CONFIRM_SIGN_IN_REQUEST = "CONFIRM_SIGN_IN_REQUEST";
export const CONFIRM_SIGN_IN_SUCCESS = "CONFIRM_SIGN_IN_SUCCESS";
export const CONFIRM_SIGN_IN_FAILURE = "CONFIRM_SIGN_IN_FAILURE";

export const REGISTER_USER_DETAILS_REQUEST = "REGISTER_USER_DETAILS_REQUEST";
export const REGISTER_USER_DETAILS_SUCCESS = "REGISTER_USER_DETAILS_SUCCESS";
export const REGISTER_USER_DETAILS_FAILURE = "REGISTER_USER_DETAILS_FAILURE";

export const LOGOUT = "LOGOUT";

const buildUserName = (email) => `cu_${email.replace("@", "_")}`.toLowerCase();

const checkAuthStateRequest = () => ({
  type: CHECK_AUTH_STATE_REQUEST,
});

const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  user,
});

const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  error,
});

const signUpRequest = () => ({
  type: REGISTER_REQUEST,
});

const signUpSuccess = (user) => ({
  type: REGISTER_SUCCESS,
  user,
});

const signUpFailure = (error) => ({
  type: REGISTER_FAILURE,
  error,
});

const confirmSignUpRequest = () => ({
  type: CONFIRM_SIGN_UP_REQUEST,
});

const confirmSignUpSuccess = (user) => ({
  type: CONFIRM_SIGN_UP_SUCCESS,
  user,
});

const confirmSignUpFailure = (error) => ({
  type: CONFIRM_SIGN_UP_FAILURE,
  error,
});

const confirmSignInRequest = () => ({
  type: CONFIRM_SIGN_IN_REQUEST,
});

const confirmSignInSuccess = (user) => ({
  type: CONFIRM_SIGN_IN_SUCCESS,
  user,
});

const confirmSignInFailure = (error) => ({
  type: CONFIRM_SIGN_IN_FAILURE,
  error,
});

const registerUserDetailsRequest = () => ({
  type: REGISTER_USER_DETAILS_REQUEST,
});

const registerUserDetailsSuccess = (
  firstName,
  lastName,
  playerNumber,
  clubId
) => ({
  type: REGISTER_USER_DETAILS_SUCCESS,
  user: { firstName, lastName, playerNumber, clubId },
});

const registerUserDetailsFailure = (error) => ({
  type: REGISTER_USER_DETAILS_FAILURE,
  error,
});

const logout = () => ({
  type: LOGOUT,
});

const setUser = async (dispatch, extras = {}) => {
  try {
    const session = await Auth.currentSession();
    const idToken = session.idToken.jwtToken;
    const user = await Auth.currentAuthenticatedUser();
    const user_id = user.attributes.sub;
    initApi(user_id, idToken);
    dispatch(
      loginSuccess({
        username: user.username,
        id: user_id,
        token: idToken,
        ...extras,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(loginFailure(error.message ?? "Error setting user"));
  }
};

export const isAuthenticated = () => async (dispatch) => {
  const session = await Auth.currentSession();
  if (session.isValid()) {
    await setUser(dispatch);
  }
};
export const login = (email, password) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const username = buildUserName(email);
    await Auth.signIn(username, password);
    await setUser(dispatch);
  } catch (error) {
    console.log(error);
    switch (error.code) {
      case "UserNotFoundException":
        dispatch(loginFailure("שם המשתמש לא קיים..."));
        break;
      case "NotAuthorizedException":
        dispatch(loginFailure("שם המשתמש או הסיסמא לא נכונים.. ננסה שוב?"));
        break;
      default:
        dispatch(loginFailure(error.message ?? "יש פה בעיה.. אנחנו על זה"));
    }
  }
};

export const logoutUser = () => (dispatch) => {
  Auth.signOut()
    .then(() => dispatch(logout()))
    .catch((error) => console.log(error));
};

export const register = (email, phone_number, password) => async (dispatch) => {
  const formattedPhoneNumber = formatPhoneNumber(phone_number);
  dispatch(signUpRequest());

  try {
    const result = await Auth.signUp({
      username: buildUserName(email),
      password: password,
      attributes: {
        email,
        phone_number: formattedPhoneNumber,
      },
      autoSignIn: { enabled: true },
    });

    const user = {
      username: result.user.getUsername(),
      user_id: result.userSub,
      email,
      phoneNumber: formatPhoneNumber(phone_number),
    };
    await createUser({
      id: user.user_id,
      email: user.email,
      phoneNumber: user.phoneNumber,
    });

    initApi(user.user_id);
    dispatch(signUpSuccess(user));
  } catch (error) {
    console.log(error);
    switch (error) {
      case "UsernameExistsException":
        dispatch(signUpFailure("User already exists"));
      default:
        dispatch(signUpFailure(error.message ?? "Error registering"));
    }
  }
};

export const confirmSignUp = (username, code) => async (dispatch) => {
  dispatch(confirmSignUpRequest());
  try {
    await Auth.confirmSignUp(username, code);
    dispatch(confirmSignUpSuccess());
  } catch (error) {
    console.log(error);
    switch (error) {
      case "CodeMismatchException":
        dispatch(confirmSignUpFailure("Invalid code"));
      case "ExpiredCodeException":
        await Auth.resendSignUp(username); // TODO: Add a resend code button
        dispatch(
          confirmSignUpFailure("Code expired. We've sent you a new one.")
        );
      default:
        dispatch(
          confirmSignUpFailure(error.message ?? "Error confirming sign up")
        );
    }
  }
};

export const confirmSignIn = (user, code) => async (dispatch) => {
  try {
    dispatch(confirmSignInRequest());
    await Auth.confirmSignIn(user, code);
    dispatch(confirmSignInSuccess());
  } catch (error) {
    console.log(error);
    switch (error) {
      case "CodeMismatchException":
        dispatch(confirmSignInFailure("Invalid code"));
      case "ExpiredCodeException":
        await Auth.resendSignUp(username); // TODO: Add a resend code button
        dispatch(
          confirmSignInFailure("Code expired. We've sent you a new one.")
        );
      default:
        dispatch(
          confirmSignInFailure(error.message ?? "Error confirming sign in")
        );
    }
  }
};

export const completeRegistration =
  (firstName, lastName, playerNumber, clubId) => async (dispatch) => {
    dispatch(registerUserDetailsRequest());
    try {
      await completeRegistrationApi(firstName, lastName, playerNumber, clubId);
      await setUser(dispatch, { firstName, lastName, playerNumber, clubId });
      dispatch(
        registerUserDetailsSuccess(firstName, lastName, playerNumber, clubId)
      );
    } catch (error) {
      dispatch(
        registerUserDetailsFailure(error.message ?? "Error registering user")
      );
    }
  };

export const checkAuthState = () => async (dispatch) => {
  try {
    dispatch(checkAuthStateRequest());
    const session = await Auth.currentSession();
    if (session.isValid()) {
      await setUser(dispatch);
    } else {
      console.log("NOT VALID!");
    }
  } catch (error) {
    console.log("error", error);
  } finally {
    dispatch({ type: CHECK_AUTH_STATE_DONE });
  }
};
