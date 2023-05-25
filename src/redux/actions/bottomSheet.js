export const SHOW_BOTTOM_SHEET = "SHOW_BOTTOM_SHEET";
export const HIDE_BOTTOM_SHEET = "HIDE_BOTTOM_SHEET";

export const showBottomSheet = (event_id) => ({
  type: SHOW_BOTTOM_SHEET,
  payload: { event_id },
});

export const hideBottomSheet = () => ({
  type: HIDE_BOTTOM_SHEET,
});
