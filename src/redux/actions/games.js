import axios from "axios";

export const FETCH_GAMES_REQUEST = "FETCH_GAMES_REQUEST";
export const FETCH_GAMES_SUCCESS = "FETCH_GAMES_SUCCESS";
export const FETCH_GAMES_FAILURE = "FETCH_GAMES_FAILURE";

export const ADD_GAME_REQUEST = "ADD_GAME_REQUEST";
export const ADD_GAME_SUCCESS = "ADD_GAME_SUCCESS";
export const ADD_GAME_FAILURE = "ADD_GAME_FAILURE";

export const UPDATE_GAME_REQUEST = "UPDATE_GAME_REQUEST";
export const UPDATE_GAME_SUCCESS = "UPDATE_GAME_SUCCESS";
export const UPDATE_GAME_FAILURE = "UPDATE_GAME_FAILURE";

export const DELETE_GAME_REQUEST = "DELETE_GAME_REQUEST";
export const DELETE_GAME_SUCCESS = "DELETE_GAME_SUCCESS";
export const DELETE_GAME_FAILURE = "DELETE_GAME_FAILURE";

export const CLEAR_GAMES = "CLEAR_GAMES";

const fetchGamesRequest = () => ({
  type: FETCH_GAMES_REQUEST,
});

const fetchGamesSuccess = (games) => ({
  type: FETCH_GAMES_SUCCESS,
  payload: { games },
});

const fetchGamesFailure = (error) => ({
  type: FETCH_GAMES_FAILURE,
  payload: { error },
});

const addGameRequest = () => ({
  type: ADD_GAME_REQUEST,
});

const addGameSuccess = (game) => ({
  type: ADD_GAME_SUCCESS,
  payload: { game },
});

const addGameFailure = (error) => ({
  type: ADD_GAME_FAILURE,
  payload: { error },
});

const updateGameRequest = (game) => ({
  type: UPDATE_GAME_REQUEST,
  payload: { game },
});

const updateGameSuccess = (game) => ({
  type: UPDATE_GAME_SUCCESS,
  payload: { game },
});

const updateGameFailure = (error) => ({
  type: UPDATE_GAME_FAILURE,
  payload: { error },
});

const deleteGameRequest = (id) => ({
  type: DELETE_GAME_REQUEST,
  payload: { id },
});

const deleteGameSuccess = (id) => ({
  type: DELETE_GAME_SUCCESS,
  payload: { id },
});

const deleteGameFailure = (error) => ({
  type: DELETE_GAME_FAILURE,
  payload: { error },
});

export const clearGames = () => ({
  type: CLEAR_GAMES,
});

export const handleFetchGames = () => async (dispatch) => {
  dispatch(fetchGamesRequest());
  try {
    const response = await axios.get("/api/games", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const games = JSON.parse(response.data);
    dispatch(fetchGamesSuccess(games));
  } catch (error) {
    dispatch(fetchGamesFailure(error.message));
  }
};

export const handleAddGame = (game) => async (dispatch) => {
  dispatch(addGameRequest());
  try {
    const response = await axios.post("/api/games", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(game),
    });
    const newGame = JSON.parse(response.data);
    dispatch(addGameSuccess(newGame));
  } catch (error) {
    dispatch(addGameFailure(error.message));
  }
};

export const handleUpdateGame = (game) => async (dispatch) => {
  dispatch(updateGameRequest());
  try {
    const response = await axios.put(`/api/games/${game.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(game),
    });
    const updatedGame = JSON.parse(response.data);
    dispatch(updateGameSuccess(updatedGame));
  } catch (error) {
    dispatch(updateGameFailure(error.message));
  }
};

export const handleDeleteGame = (id) => async (dispatch) => {
  dispatch(deleteGameRequest());
  try {
    await axios.delete(`/api/games/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch(deleteGameSuccess(id));
  } catch (error) {
    dispatch(deleteGameFailure(error.message));
  }
};

export const handleClearGames = () => async (dispatch) => {
  dispatch(clearGames());
};
