import styled from 'styled-components';

const CalendarWeeks = styled.li`
  text-align: center;
  font-size: 0.8rem;
  font-weight: bolder;
  line-height: 1.3rem;
  color: #80889d;
  list-style-type: none;

  max-width: 42px;
  width: 100%;
`;

export const RenderWeekdays = ({ dayOfWeeks }: { dayOfWeeks: string[] }) => {
  return (
    <>
      {dayOfWeeks.map((day: string, index: number) => (
        <CalendarWeeks key={index}>{day}</CalendarWeeks>
      ))}
    </>
  );
};
