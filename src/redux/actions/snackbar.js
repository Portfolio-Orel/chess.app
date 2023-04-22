export const SHOW_SNACKBAR = 'SHOW_SNACKBAR';
export const HIDE_SNACKBAR = 'HIDE_SNACKBAR';

export const showSnackbar = (message, variant) => ({
  type: SHOW_SNACKBAR,
  payload: { message, variant },
});

export const hideSnackbar = () => ({
  type: HIDE_SNACKBAR,
});
