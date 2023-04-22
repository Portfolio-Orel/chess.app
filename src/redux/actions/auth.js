import { Auth } from "aws-amplify";
import {
  generateStrongPassword,
  formatPhoneNumber,
} from "../../utils/authUtils";
import axios from "axios";

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

const registerRequest = () => ({
  type: REGISTER_REQUEST,
});

const registerSuccess = (user) => ({
  type: REGISTER_SUCCESS,
  user,
});

const registerFailure = (error) => ({
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
export const login = (username, password) => async (dispatch) => {
  dispatch(loginRequest());
  await Auth.signIn(username, password);
  await setUser(dispatch);
};

export const logoutUser = () => (dispatch) => {
  Auth.signOut()
    .then(() => dispatch(logout()))
    .catch((error) => console.log(error));
};

export const register = (email, phone_number) => async (dispatch) => {
  const formattedPhoneNumber = formatPhoneNumber(phone_number);
  dispatch(registerRequest());
  try {
    const result = await Auth.signUp({
      username: formattedPhoneNumber,
      password: generateStrongPassword(),
      attributes: {
        email,
        phone_number: formattedPhoneNumber,
      },
      autoSignIn: { enabled: true },
    });
    const user = {
      username: result.user.getUsername(),
      userId: result.userSub,
      email,
      phoneNumber: formatPhoneNumber(phone_number),
    };
    dispatch(registerSuccess(user));
  } catch (error) {
    console.log(error);
    switch (error) {
      case "UsernameExistsException":
        dispatch(registerFailure("User already exists"));
      default:
        dispatch(registerFailure(error.message ?? "Error registering"));
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
