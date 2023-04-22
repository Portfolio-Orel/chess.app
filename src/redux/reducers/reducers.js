import authReducer from "./auth";
import eventsReducer from "./event";
import gameReducer from "./games";
import gameFormatsReducer from "./gameFormats";
import intervalsReducer from "./intervals";
import snacbbarReducer from "./snackbar";

import { combineReducers } from "redux";

export default combineReducers({
  auth: authReducer,
  events: eventsReducer,
  games: gameReducer,
  gameFormats: gameFormatsReducer,
  intervals: intervalsReducer,
  snackbar: snacbbarReducer,
});
