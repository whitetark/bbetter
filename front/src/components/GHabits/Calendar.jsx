import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Badge } from '@mui/material';
import { DayCalendarSkeleton, PickersDay } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { useState } from 'react';
import * as Styled from '../../styles/GHabits.styled';
import Button from '../UI/Button';

function ServerDay(props) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected = !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) >= 0;

  return (
    <>
      {isSelected ? (
        <Badge key={props.day.toString()} overlap='circular' badgeContent={isSelected && '✅'}>
          <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
        </Badge>
      ) : (
        <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
      )}
    </>
  );
}

export default function Calendar() {
  const [isLoading, setIsLoading] = useState(false);
  const [highlightedDays, setHighlightedDays] = useState([1, 2, 15]);
  const [value, setValue] = useState(dayjs(new Date()));

  const handleMonthChange = (date) => {
    setIsLoading(true);
    setHighlightedDays([1, 2, 13]);
  };

  const handleAdd = () => {
    const newDays = highlightedDays;
    newDays.push(value.date());
    setHighlightedDays(newDays);
  };

  const handleRemove = () => {
    const newDays = highlightedDays;
    const index = newDays.indexOf(value.date());
    newDays.splice(index, 1);
    setHighlightedDays(newDays);
  };

  const isSelected = highlightedDays.indexOf(value.date()) >= 0;

  return (
    <Styled.Calendar>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          value={value}
          loading={isLoading}
          renderLoading={() => <DayCalendarSkeleton />}
          onChange={(newValue) => setValue(newValue)}
          disableFuture
          slots={{
            day: ServerDay,
          }}
          slotProps={{
            day: {
              highlightedDays,
            },
          }}
        />
      </LocalizationProvider>
      <Styled.CalendarActions>
        {isSelected ? (
          <Button onClick={handleRemove} className='remove'>
            <FontAwesomeIcon icon='fa-solid fa-trash-can' fixedWidth />
          </Button>
        ) : (
          <Button onClick={handleAdd} className='add'>
            <FontAwesomeIcon icon='fa-solid fa-plus' fixedWidth />
          </Button>
        )}
      </Styled.CalendarActions>
    </Styled.Calendar>
  );
}
