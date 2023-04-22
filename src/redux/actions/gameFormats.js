import axios from "axios";

export const FETCH_GAME_FORMATS_REQUEST = "FETCH_GAME_FORMATS_REQUEST";
export const FETCH_GAME_FORMATS_SUCCESS = "FETCH_GAME_FORMATS_SUCCESS";
export const FETCH_GAME_FORMATS_FAILURE = "FETCH_GAME_FORMATS_FAILURE";

export const ADD_GAME_FORMAT_REQUEST = "ADD_GAME_FORMAT_REQUEST";
export const ADD_GAME_FORMAT_SUCCESS = "ADD_GAME_FORMAT_SUCCESS";
export const ADD_GAME_FORMAT_FAILURE = "ADD_GAME_FORMAT_FAILURE";

export const UPDATE_GAME_FORMAT_REQUEST = "UPDATE_GAME_FORMAT_REQUEST";
export const UPDATE_GAME_FORMAT_SUCCESS = "UPDATE_GAME_FORMAT_SUCCESS";
export const UPDATE_GAME_FORMAT_FAILURE = "UPDATE_GAME_FORMAT_FAILURE";

export const DELETE_GAME_FORMAT_REQUEST = "DELETE_GAME_FORMAT_REQUEST";
export const DELETE_GAME_FORMAT_SUCCESS = "DELETE_GAME_FORMAT_SUCCESS";
export const DELETE_GAME_FORMAT_FAILURE = "DELETE_GAME_FORMAT_FAILURE";

export const CLEAR_GAME_FORMATS = "CLEAR_GAME_FORMATS";

const fetchGameFormatsRequest = () => ({
  type: FETCH_GAME_FORMATS_REQUEST,
});

const fetchGameFormatsSuccess = (gameFormats) => ({
  type: FETCH_GAME_FORMATS_SUCCESS,
  payload: { gameFormats },
});

const fetchGameFormatsFailure = (error) => ({
  type: FETCH_GAME_FORMATS_FAILURE,
  payload: { error },
});

const addGameFormatRequest = () => ({
  type: ADD_GAME_FORMAT_REQUEST,
});

const addGameFormatSuccess = (gameFormat) => ({
  type: ADD_GAME_FORMAT_SUCCESS,
  payload: { gameFormat },
});

const addGameFormatFailure = (error) => ({
  type: ADD_GAME_FORMAT_FAILURE,
  payload: { error },
});

const updateGameFormatRequest = (gameFormat) => ({
  type: UPDATE_GAME_FORMAT_REQUEST,
  payload: { gameFormat },
});

const updateGameFormatSuccess = (gameFormat) => ({
  type: UPDATE_GAME_FORMAT_SUCCESS,
  payload: { gameFormat },
});

const updateGameFormatFailure = (error) => ({
  type: UPDATE_GAME_FORMAT_FAILURE,
  payload: { error },
});

const deleteGameFormatRequest = (id) => ({
  type: DELETE_GAME_FORMAT_REQUEST,
  payload: { id },
});

const deleteGameFormatSuccess = (id) => ({
  type: DELETE_GAME_FORMAT_SUCCESS,
  payload: { id },
});

const deleteGameFormatFailure = (error) => ({
  type: DELETE_GAME_FORMAT_FAILURE,
  payload: { error },
});

const clearGameFormats = () => ({
  type: CLEAR_GAME_FORMATS,
});

export const handleFetchGameFormats = () => async (dispatch) => {
  dispatch(fetchGameFormatsRequest());
  try {
    const response = await axios.get("/api/gameFormats", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const gameFormats = JSON.parse(response.data);
    dispatch(fetchGameFormatsSuccess(gameFormats));
  } catch (error) {
    dispatch(fetchGameFormatsFailure(error.message));
  }
};

export const handleAddGameFormat = (gameFormat) => async (dispatch) => {
  dispatch(addGameFormatRequest());
  try {
    const response = await axios.post("/api/gameFormats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(gameFormat),
    });
    const gameFormat = JSON.parse(response.data);
    dispatch(addGameFormatSuccess(gameFormat));
  } catch (error) {
    dispatch(addGameFormatFailure(error.message));
  }
};

export const handleUpdateGameFormat = (gameFormat) => async (dispatch) => {
  dispatch(updateGameFormatRequest(gameFormat));
  try {
    const response = await axios.put(`/api/gameFormats/${gameFormat.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(gameFormat),
    });
    const gameFormat = JSON.parse(response.data);
    dispatch(updateGameFormatSuccess(gameFormat));
  } catch (error) {
    dispatch(updateGameFormatFailure(error.message));
  }
};

export const handleDeleteGameFormat = (id) => async (dispatch) => {
  dispatch(deleteGameFormatRequest(id));
  try {
    const response = await axios.delete(`/api/gameFormats/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const gameFormat = JSON.parse(response.data);
    dispatch(deleteGameFormatSuccess(gameFormat));
  } catch (error) {
    dispatch(deleteGameFormatFailure(error.message));
  }
};

export const handleClearGameFormats = () => async (dispatch) => {
  dispatch(clearGameFormats());
};
