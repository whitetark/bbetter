import { Badge } from '@mui/material';
import { DateCalendar, DayCalendarSkeleton, PickersDay } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';
import weekday from 'dayjs/plugin/weekday';
import React from 'react';
import * as Styled from '../../styles/Reflections.styled';

dayjs.extend(updateLocale);
dayjs.extend(weekday);

dayjs.updateLocale('en', {
  weekStart: 1,
});

const isDisabled = (date) => {
  const sunday = dayjs().day(0);

  return date > sunday;
};

const isInSameWeek = (dayA, dayB) => {
  if (dayB == null) {
    return false;
  }

  return dayA.isSame(dayB, 'week');
};

function ServerDay(props) {
  const { highlightedDays, day, selectedDay, hoveredDay, outsideCurrentMonth, ...other } = props;

  const isSelected = !outsideCurrentMonth && highlightedDays?.indexOf(props.day.date()) >= 0;

  let classes = '';
  classes += isInSameWeek(day, selectedDay) ? 'selected ' : '';
  classes += isInSameWeek(day, hoveredDay) ? 'hovered ' : '';
  classes += day.day() === 1 ? 'monday ' : '';
  classes += day.day() === 0 ? 'sunday ' : '';

  return (
    <>
      {isSelected ? (
        <Badge key={props.day.toString()} overlap='circular' badgeContent={'🙂'}>
          <PickersDay
            {...other}
            day={day}
            className={classes}
            outsideCurrentMonth={outsideCurrentMonth}
          />
        </Badge>
      ) : (
        <PickersDay
          {...other}
          day={day}
          className={classes}
          outsideCurrentMonth={outsideCurrentMonth}
        />
      )}
    </>
  );
}

export default function ReflectionCalendar({ value, setValue, highlightedDays, handleMonth }) {
  const [hoveredDay, setHoveredDay] = React.useState(null);

  return (
    <Styled.Calendar>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          value={value}
          renderLoading={() => <DayCalendarSkeleton />}
          onChange={(newValue) => setValue(newValue)}
          shouldDisableDate={isDisabled}
          disableFuture
          onMonthChange={handleMonth}
          onYearChange={handleMonth}
          slots={{
            day: ServerDay,
          }}
          slotProps={{
            day: (ownerState) => ({
              highlightedDays,
              selectedDay: value,
              hoveredDay,
              onPointerEnter: () => setHoveredDay(ownerState.day),
              onPointerLeave: () => setHoveredDay(null),
            }),
          }}
        />
      </LocalizationProvider>
    </Styled.Calendar>
  );
}
