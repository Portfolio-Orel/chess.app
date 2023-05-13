import { fetchClubs } from "../../helper/api";

export const FETCH_CLUBS_REQUEST = "FETCH_CLUBS_REQUEST";
export const FETCH_CLUBS_SUCCESS = "FETCH_CLUBS_SUCCESS";
export const FETCH_CLUBS_FAILURE = "FETCH_CLUBS_FAILURE";

const fetchClubsRequest = () => ({
  type: FETCH_CLUBS_REQUEST,
});

const fetchClubsSuccess = (clubs) => ({
  type: FETCH_CLUBS_SUCCESS,
  payload: { clubs },
});

const fetchClubsFailure = (error) => ({
  type: FETCH_CLUBS_FAILURE,
  payload: { error },
});

export const handleFetchClubs = () => async (dispatch) => {
  dispatch(fetchClubsRequest());
  try {
    const clubs = await fetchClubs();
    dispatch(fetchClubsSuccess(clubs));
  } catch (error) {
    dispatch(fetchClubsFailure(error));
  }
};
