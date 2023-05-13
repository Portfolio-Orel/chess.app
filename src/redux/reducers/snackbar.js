import { SHOW_SNACKBAR, HIDE_SNACKBAR } from "../actions/snackbar";

const variantColors = {
  success: "#38bf01",
  error: "#dd1e42",
  warning: "#e1d220",
  info: "#2091e1",
};

const initialState = {
  message: "",
  variant: "",
  color: "",
  isOpen: false,
  duration: 4000,
};

const snackbarReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_SNACKBAR:
      return {
        ...state,
        message: action.payload.message,
        variant: action.payload.variant,
        isOpen: true,
        color: variantColors[action.payload.variant],
        duration: action.payload.duration ? action.payload.duration : 4000,
      };
    case HIDE_SNACKBAR:
      return {
        ...state,
        message: "",
        variant: "",
        isOpen: false,
        color: "",
      };
    default:
      return state;
  }
};

export default snackbarReducer;
