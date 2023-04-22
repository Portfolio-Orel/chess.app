import { SHOW_SNACKBAR, HIDE_SNACKBAR } from '../actions/snackbar';

const initialState = {
  message: '',
  variant: '',
  isOpen: false,
};

const snackbarReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_SNACKBAR:
      return {
        ...state,
        message: action.payload.message,
        variant: action.payload.variant,
        isOpen: true,
      };
    case HIDE_SNACKBAR:
      return {
        ...state,
        message: '',
        variant: '',
        isOpen: false,
      };
    default:
      return state;
  }
};

export default snackbarReducer;
