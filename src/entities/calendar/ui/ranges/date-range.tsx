import { memo, useCallback } from 'react';
import { useQuery } from 'react-query';
import { useHandleDateTimeRangeChange } from '@/entities/calendar/ui/ranges/helper.ts';
import { formatDate, isMobile } from '@/shared/lib';
import { Input } from '@/shared/ui';
import { CalendarApi, CalendarModel } from '../../';
import { Calendar } from '../calendar.tsx';

export const DateRange = memo(() => {
  const { startDate, setStartDate, setReciptDate } =
    CalendarModel.useCalendarStore();

  useQuery({
    queryKey: [CalendarApi.QueryReqName.checkTimeApi],
    queryFn: CalendarApi.checkTimeApi,
    refetchOnWindowFocus: false,
    onSuccess: (_data) => {
      if (_data) {
        setReciptDate(_data.date);
      }
    },
  });

  const { isShown, rootRef, setIsShown } = useHandleDateTimeRangeChange();

  const handleClick = useCallback((date: Date | string) => {
    setStartDate(date);
    setIsShown(false);
  }, []);

  return (
    <div style={{ width: isMobile ? '100%' : 'auto' }} ref={rootRef}>
      <Input
        onClick={() => setIsShown((prev) => !prev)}
        label="Дата приема"
        placeholder="_ _._ _._ _"
        value={startDate === '' ? '' : formatDate(startDate)}
        fullWidth={isMobile}
        inputProps={{ readOnly: true }}
      />

      {isShown && <Calendar onClick={handleClick} />}
    </div>
  );
});
