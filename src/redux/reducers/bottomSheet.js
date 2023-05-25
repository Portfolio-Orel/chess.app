import { SHOW_BOTTOM_SHEET, HIDE_BOTTOM_SHEET } from "../actions/bottomSheet";

const initialState = {
  show: false,
  event_id: null,
};

export default function bottomSheet(state = initialState, action) {
  switch (action.type) {
    case SHOW_BOTTOM_SHEET:
      return {
        ...state,
        show: true,
        event_id: action.payload.event_id,
      };
    case HIDE_BOTTOM_SHEET:
      return {
        ...state,
        show: false,
        event: null,
        game: null,
        gameFormat: null,
      };
    default:
      return state;
  }
}
