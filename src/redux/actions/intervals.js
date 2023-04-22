import axios from "axios";

export const FETCH_INTERVALS_REQUEST = "FETCH_INTERVALS_REQUEST";
export const FETCH_INTERVALS_SUCCESS = "FETCH_INTERVALS_SUCCESS";
export const FETCH_INTERVALS_FAILURE = "FETCH_INTERVALS_FAILURE";

export const ADD_INTERVAL_REQUEST = "ADD_INTERVAL_REQUEST";
export const ADD_INTERVAL_SUCCESS = "ADD_INTERVAL_SUCCESS";
export const ADD_INTERVAL_FAILURE = "ADD_INTERVAL_FAILURE";

export const UPDATE_INTERVAL_REQUEST = "UPDATE_INTERVAL_REQUEST";
export const UPDATE_INTERVAL_SUCCESS = "UPDATE_INTERVAL_SUCCESS";
export const UPDATE_INTERVAL_FAILURE = "UPDATE_INTERVAL_FAILURE";

export const DELETE_INTERVAL_REQUEST = "DELETE_INTERVAL_REQUEST";
export const DELETE_INTERVAL_SUCCESS = "DELETE_INTERVAL_SUCCESS";
export const DELETE_INTERVAL_FAILURE = "DELETE_INTERVAL_FAILURE";

export const CLEAR_INTERVALS = "CLEAR_INTERVALS";

const fetchIntervalsRequest = () => ({
  type: FETCH_INTERVALS_REQUEST,
});

const fetchIntervalsSuccess = (intervals) => ({
  type: FETCH_INTERVALS_SUCCESS,
  payload: { intervals },
});

const fetchIntervalsFailure = (error) => ({
  type: FETCH_INTERVALS_FAILURE,
  payload: { error },
});

const addIntervalRequest = () => ({
  type: ADD_INTERVAL_REQUEST,
});

const addIntervalSuccess = (interval) => ({
  type: ADD_INTERVAL_SUCCESS,
  payload: { interval },
});

const addIntervalFailure = (error) => ({
  type: ADD_INTERVAL_FAILURE,
  payload: { error },
});

const updateIntervalRequest = (interval) => ({
  type: UPDATE_INTERVAL_REQUEST,
  payload: { interval },
});

const updateIntervalSuccess = (interval) => ({
  type: UPDATE_INTERVAL_SUCCESS,
  payload: { interval },
});

const updateIntervalFailure = (error) => ({
  type: UPDATE_INTERVAL_FAILURE,
  payload: { error },
});

const deleteIntervalRequest = (id) => ({
  type: DELETE_INTERVAL_REQUEST,
  payload: { id },
});

const deleteIntervalSuccess = (id) => ({
  type: DELETE_INTERVAL_SUCCESS,
  payload: { id },
});

const deleteIntervalFailure = (error) => ({
  type: DELETE_INTERVAL_FAILURE,
  payload: { error },
});

export const clearIntervals = () => ({
  type: CLEAR_INTERVALS,
});

export const handleFetchIntervals = () => async (dispatch) => {
  dispatch(fetchIntervalsRequest());
  try {
    const response = await axios.get("/api/intervals", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const intervals = JSON.parse(response.data);
    dispatch(fetchIntervalsSuccess(intervals));
  } catch (error) {
    dispatch(fetchIntervalsFailure(error.message));
  }
};

export const handleAddInterval = (interval) => async (dispatch) => {
  dispatch(addIntervalRequest());
  try {
    const response = await axios.post("/api/intervals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(interval),
    });
    const newInterval = JSON.parse(response.data);
    dispatch(addIntervalSuccess(newInterval));
  } catch (error) {
    dispatch(addIntervalFailure(error.message));
  }
};

export const handleUpdateInterval = (interval) => async (dispatch) => {
  dispatch(updateIntervalRequest());
  try {
    const response = await axios.put(`/api/intervals/${interval.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(interval),
    });
    const updatedInterval = JSON.parse(response.data);
    dispatch(updateIntervalSuccess(updatedInterval));
  } catch (error) {
    dispatch(updateIntervalFailure(error.message));
  }
};

export const handleDeleteInterval = (id) => async (dispatch) => {
  dispatch(deleteIntervalRequest(id));
  try {
    await axios.delete(`/api/intervals/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch(deleteIntervalSuccess(id));
  } catch (error) {
    dispatch(deleteIntervalFailure(error.message));
  }
};
