import { formatDate } from '@/shared/lib';

export const formatFormDate = (date: Date, time: string[]) => {
  const validDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    +time[0],
    +time[1],
    0,
  );

  return formatDate(validDate, 'YYYY-DD-MM HH:mm');
};
