import { Auth } from "aws-amplify";
import axios from "axios";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
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

const logout = () => ({
  type: LOGOUT,
});

const setUser = async (dispatch) => {
  const session = await Auth.currentSession();
  const idToken = session.idToken.jwtToken;
  const user = await Auth.currentAuthenticatedUser();
  axios.defaults.headers.common["Authorization"] = idToken;
  axios.defaults.headers.common["user_id"] = user.username;
  const result = await axios.get("/api/users");
  const userFromServer = JSON.parse(result.data);
  if (userFromServer.role !== "admin" && userFromServer.role !== "superadmin") {
    throw new Error("You are not authorized to access this page");
  }
  dispatch(
    loginSuccess({
      username: user.username,
      token: idToken,
    })
  );
};

export const isAuthenticated = () => async (dispatch) => {
  const session = await Auth.currentSession();
  if (session.isValid()) {
    await setUser(dispatch);
  }
};
export const login = (username, password) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    await Auth.signIn(username, password);
    await setUser(dispatch);
  } catch (error) {
    dispatch(loginFailure(error));
    console.log(error);
  }
};

export const logoutUser = () => (dispatch) => {
  Auth.signOut()
    .then(() => dispatch(logout()))
    .catch((error) => console.log(error));
};
