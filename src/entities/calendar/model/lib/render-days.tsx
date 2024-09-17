import { ReactNode, useCallback } from 'react';
import styled from 'styled-components';
import { formatDate } from '@/shared/lib';

type RenderDaysPropsType = {
  date: Date;
  firstDay: number;
  days: Date[];
  lastDay: number;
  curr: number;
  handleClick: (day: Date) => void;
};

const CalendarDayText = styled.span<{ $selected?: boolean }>`
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5rem;
  text-align: center;
  color: ${(props) => (props.$selected ? '#1370B9' : '#38424f')};
`;

const CalendarDay = styled.div<{ $day: Date; $curr?: number }>`
  max-width: 42px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.4rem;
  cursor: ${(props) => (new Date() >= props.$day ? 'not-allowed' : 'pointer')};

  border: ${(props) =>
    props?.$curr === props.$day.getDate() ? '1px solid #11519C' : 'none'};
  border-radius: ${(props) =>
    props?.$curr === props.$day.getDate() ? '0.6rem' : '0'};

  &:hover {
    background: ${(props) =>
      new Date() > props.$day ? 'transparent' : '#084e9f33'};
    border-radius: ${(props) => (new Date() > props.$day ? '0' : '0.6rem')};
  }
`;

const BlankDay = styled.div`
  max-width: 42px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.4rem;
`;

export const RenderDays = ({
  date,
  firstDay,
  days,
  lastDay,
  curr,
  handleClick,
}: RenderDaysPropsType) => {
  const render = useCallback(() => {
    const blanks = [];
    for (let i = 1; i < firstDay; i++) {
      blanks.push(<BlankDay key={-i}></BlankDay>);
    }

    const monthDays: ReactNode[] = [];
    days.forEach((day: Date) => {
      monthDays.push(
        <CalendarDay
          key={day.getDate()}
          $day={day}
          $curr={curr}
          onClick={new Date() > day ? undefined : () => handleClick(day)}
        >
          <CalendarDayText
            $selected={formatDate(day) === formatDate(new Date())}
          >
            {day.getDate()}
          </CalendarDayText>
        </CalendarDay>,
      );
    });

    const totalDays = [...blanks, ...monthDays];

    const remainingBlanks = [];
    for (let i = 0; i < 6 - lastDay; i++) {
      remainingBlanks.push(<BlankDay key={`blank_${i}`}></BlankDay>);
    }

    return [...totalDays, ...remainingBlanks];
  }, [date, curr]);

  return <>{render()}</>;
};
