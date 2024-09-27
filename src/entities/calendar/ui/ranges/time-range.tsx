import { memo, useRef } from 'react';

import { useHandleDateTimeRangeChange } from '@/entities/calendar/ui/ranges/helper.ts';
import { isMobile } from '@/shared/lib';
import { ArrowDown, ArrowUp, Input } from '@/shared/ui';
import { CalendarModel } from '../../index.ts';
import { Time, TimeAction, TimeItem, TimeList } from './style';

export const TimeRange = memo(() => {
  const { time, setTime } = CalendarModel.useCalendarStore((state) => state);
  const listRef = useRef<HTMLUListElement>(null);

  const { isShown, rootRef, setIsShown } = useHandleDateTimeRangeChange();

  const handleScroll = (offset: number) => {
    if (listRef.current) {
      listRef.current.scrollTop += offset;
    }
  };

  const itemClick = (time: string) => {
    setTime(time);
    setIsShown(false);
  };

  return (
    <div style={{ width: isMobile ? '100%' : 'auto' }} ref={rootRef}>
      <Input
        label="Время"
        fullWidth={isMobile}
        value={time}
        onClick={() => setIsShown((prev) => !prev)}
        placeholder="_ _._ _"
        inputProps={{ readOnly: true }}
      />

      {isShown && (
        <Time>
          <TimeAction type="button" onClick={() => handleScroll(-120)}>
            <ArrowUp />
          </TimeAction>

          <TimeList ref={listRef}>
            {[
              '8:00',
              '8:20',
              '8:40',
              '9:00',
              '9:20',
              '9:40',
              '10:00',
              '10:20',
              '10:40',
              '11:00',
              '11:20',
              '11:40',
              '12:00',
              '12:20',
              '12:40',
              '13:00',
            ].map((el) => (
              <TimeItem key={el} onClick={() => itemClick(el)}>
                {el}
              </TimeItem>
            ))}
          </TimeList>

          <TimeAction type="button" onClick={() => handleScroll(120)}>
            <ArrowDown />
          </TimeAction>
        </Time>
      )}
    </div>
  );
});
