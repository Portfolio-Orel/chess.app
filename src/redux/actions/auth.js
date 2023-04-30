import { Auth, Hub } from "aws-amplify";
import {
  generateStrongPassword,
  formatPhoneNumber,
} from "../../utils/authUtils";
import axios from "axios";

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

export const REGISTER_USER_DETAILS_REQUEST = "REGISTER_USER_DETAILS_REQUEST";
export const REGISTER_USER_DETAILS_SUCCESS = "REGISTER_USER_DETAILS_SUCCESS";
export const REGISTER_USER_DETAILS_FAILURE = "REGISTER_USER_DETAILS_FAILURE";

export const LOGOUT = "LOGOUT";

const buildUserName = (email) => {
  const emailParts = email.split("@");
  const username = emailParts.join("_");
  return username;
};

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

const registerUserDetailsRequest = () => ({
  type: REGISTER_USER_DETAILS_REQUEST,
});

const registerUserDetailsSuccess = (user) => ({
  type: REGISTER_USER_DETAILS_SUCCESS,
  user,
});

const registerUserDetailsFailure = (error) => ({
  type: REGISTER_USER_DETAILS_FAILURE,
  error,
});

const logout = () => ({
  type: LOGOUT,
});

const setUser = async (dispatch) => {
  try {
    const session = await Auth.currentSession();
    const idToken = session.idToken.jwtToken;
    const user = await Auth.currentAuthenticatedUser();
    axios.defaults.headers.common["Authorization"] = idToken;
    axios.defaults.headers.common["userid"] = user.username;
    const result = await axios.get("/api/users");
    const userFromServer = JSON.parse(result.data);
    if (
      userFromServer.role !== "admin" &&
      userFromServer.role !== "superadmin"
    ) {
      throw new Error("You are not authorized to access this page");
    }
    dispatch(
      loginSuccess({
        username: user.username,
        token: idToken,
      })
    );
  } catch (error) {
    dispatch(loginFailure(error.message ?? "Error setting user"));
  }
};

export const isAuthenticated = () => async (dispatch) => {
  const session = await Auth.currentSession();
  if (session.isValid()) {
    await setUser(dispatch);
  }
};
export const login = (email) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const user = await Auth.signIn(formatPhoneNumber("0543056286"));
    // await setUser(dispatch);
  } catch (error) {
    console.log(error);
    dispatch(loginFailure(error.message ?? "Error logging in"));
  }
};

export const logoutUser = () => (dispatch) => {
  Auth.signOut()
    .then(() => dispatch(logout()))
    .catch((error) => console.log(error));
};

export const register = (email, phone_number) => async (dispatch) => {
  const formattedPhoneNumber = formatPhoneNumber(phone_number);
  dispatch(signUpRequest());
  try {
    debugger;
    const result = await Auth.signUp({
      username: formattedPhoneNumber,
      password: generateStrongPassword(),
      attributes: {
        email,
        phone_number: formattedPhoneNumber,
        preferred_username: formattedPhoneNumber,
      },
      autoSignIn: { enabled: true },
    });
    const user = {
      username: result.user.getUsername(),
      userId: result.userSub,
      email,
      phoneNumber: formatPhoneNumber(phone_number),
    };
    debugger;
    dispatch(signUpSuccess(user));
    debugger;
  } catch (error) {
    debugger;
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

export const registerUserDetails = (user) => async (dispatch) => {
  dispatch(registerUserDetailsRequest());
  try {
    const result = await axios.put("/users", user);
    const userFromServer = JSON.parse(result.data);
    dispatch(registerUserDetailsSuccess(userFromServer));
  } catch (error) {
    dispatch(
      registerUserDetailsFailure(error.message ?? "Error registering user")
    );
  }
};

export const checkAuthState = () => async (dispatch) => {
  try {
    dispatch({ type: CHECK_AUTH_STATE_REQUEST });
    const session = await Auth.currentSession();
    console.log(session);
    if (session.isValid()) {
      await setUser(dispatch);
    }
  } catch (error) {
    console.log(error);
  } finally {
    dispatch({ type: CHECK_AUTH_STATE_DONE });
  }
};
