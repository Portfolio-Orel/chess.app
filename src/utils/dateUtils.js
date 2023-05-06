// Number to month name in hebrew
const monthsShortcuts = {
  0: "ינו'",
  1: "פבר'",
  2: "מרץ",
  3: "אפר'",
  4: "מאי",
  5: "יוני",
  6: "יולי",
  7: "אוג'",
  8: "ספט'",
  9: "אוק'",
  10: "נוב'",
  11: "דצמ'",
};

export const getMonthName = (date) => {
  const dateObj = new Date(date);
  return monthsShortcuts[dateObj.getMonth()];
};

export const getDayOfMonth = (date) => {
  const dateObj = new Date(date);
  return dateObj.getDate();
};
