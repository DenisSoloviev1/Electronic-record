export const getDaysInMonth = (date: Date) => {
  // месяц
  const month = date.getMonth();
  // год
  const year = date.getFullYear();
  // дней в месяц
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days = [];

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(year, month, i));
  }

  return days;
};
