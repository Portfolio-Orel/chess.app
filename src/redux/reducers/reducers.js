import { combineReducers } from "redux";

import authReducer from "./auth";
import eventsReducer from "./event";
import eventsParticipantsReducer from "./eventsParticipants";
import gameReducer from "./games";
import gameFormatsReducer from "./gameFormats";
import intervalsReducer from "./intervals";
import clubsReducer from "./clubs";
import snacbbarReducer from "./snackbar";

export default combineReducers({
  authState: authReducer,
  eventsState: eventsReducer,
  eventsParticipantsState: eventsParticipantsReducer,
  gamesState: gameReducer,
  gameFormatsState: gameFormatsReducer,
  intervalsState: intervalsReducer,
  snackbarState: snacbbarReducer,
  clubsState: clubsReducer,
});
