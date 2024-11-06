import { ReactNode, useCallback } from "react";
import styled from "styled-components";
import Holidays from "date-holidays";
import { formatDate } from "@/shared/lib";

type RenderDaysPropsType = {
  date: Date;
  firstDay: number;
  days: Date[];
  lastDay: number;
  curr: number;
  handleClick: (day: Date) => void;
};

// Создаем объект holidays и указываем страну и регион
const hd = new Holidays("RU", "RU-MOW");

const CalendarDayText = styled.span<{
  $selected?: boolean;
  $isNonWorkingDay?: boolean;
  $isHoliday?: boolean;
}>`
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5rem;
  text-align: center;
  color: ${(props) =>
    props.$selected
      ? "#1370B9"
      : props.$isHoliday
      ? "#FF4500"
      : props.$isNonWorkingDay
      ? "#A9A9A9"
      : "#38424f"};
`;

const CalendarDay = styled.div<{
  $day: Date;
  $curr?: number;
  $isNonWorkingDay?: boolean;
}>`
  max-width: 40px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.4rem;
  cursor: ${(props) =>
    new Date() >= props.$day || props.$isNonWorkingDay
      ? "not-allowed"
      : "pointer"};
  background-color: transparent;
  border: ${(props) =>
    props?.$curr === props.$day.getDate() ? "1px solid #11519C" : "none"};
  border-radius: ${(props) =>
    props?.$curr === props.$day.getDate() ? "0.6rem" : "0"};

  &:hover {
    background: ${(props) =>
      new Date() > props.$day || props.$isNonWorkingDay
        ? "transparent"
        : "#084e9f33"};
    border-radius: ${(props) =>
      new Date() > props.$day || props.$isNonWorkingDay ? "0" : "0.6rem"};
  }
`;

const BlankDay = styled.div`
  max-width: 40px;
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
    const blankCount = firstDay === 0 ? 6 : firstDay - 1;
    for (let i = 0; i < blankCount; i++) {
      blanks.push(<BlankDay key={`blank-${i}`} />);
    }

    const monthDays: ReactNode[] = [];
    days.forEach((day: Date) => {
      const isWeekend = day.getDay() === 0 || day.getDay() === 6;
      const holidays = hd.isHoliday(day);
      const isHoliday = Array.isArray(holidays) && holidays.some((holiday) => holiday.type === "public");
      const isNonWorkingDay = isWeekend || isHoliday;

      monthDays.push(
        <CalendarDay
          key={day.getDate()}
          $day={day}
          $curr={curr}
          $isNonWorkingDay={isNonWorkingDay}
          onClick={
            new Date() > day || isNonWorkingDay
              ? undefined
              : () => handleClick(day)
          }
        >
          <CalendarDayText
            $selected={formatDate(day) === formatDate(new Date())}
            $isNonWorkingDay={isNonWorkingDay}
            $isHoliday={isHoliday}
          >
            {day.getDate()}
          </CalendarDayText>
        </CalendarDay>
      );
    });

    const totalDays = [...blanks, ...monthDays];

    const remainingBlanks = [];
    for (let i = 0; i < 6 - lastDay; i++) {
      remainingBlanks.push(<BlankDay key={`remaining-blank-${i}`} />);
    }

    return [...totalDays, ...remainingBlanks];
  }, [date, curr, firstDay, days, lastDay, curr]);

  return <>{render()}</>;
};
