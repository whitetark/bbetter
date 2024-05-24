import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Badge } from '@mui/material';
import { DayCalendarSkeleton, PickersDay } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { GHabitService } from '../../app/services/api';
import { useAddGHabitDate, useDeleteGHabitDate } from '../../hooks/use-ghabits';
import * as Styled from '../../styles/GHabits.styled';
import Button from '../UI/Button';
import Notification from '../UI/Notification';

function ServerDay(props) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !props.outsideCurrentMonth && highlightedDays?.data?.indexOf(props.day.date()) >= 0;

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

export default function GHabitCalendar({ ghabit }) {
  const requestAbortController = useRef(null);
  const [value, setValue] = useState(dayjs(new Date()));
  const [month, setMonth] = useState(dayjs(new Date()));
  const [open, setOpen] = useState(false);

  const { mutateAsync: addAsync } = useAddGHabitDate();
  const { mutateAsync: deleteAsync } = useDeleteGHabitDate();
  const valueForPayload = month || value;

  const payload = {
    id: ghabit.gHabitId,
    month: valueForPayload.month() + 1,
    year: valueForPayload.year(),
  };

  const { data: highlightedDays, isLoading } = useQuery(
    ['getDatesByMonth', payload],
    () => {
      const controller = new AbortController();
      requestAbortController.current = controller;
      return GHabitService.getDatesByMonth({ ...payload, signal: controller.signal });
    },
    {
      onError: (error) => {
        console.log('Get GHabits Date error: ' + error.message);
      },
      staleTime: 30000,
      enabled: !!month,
    },
  );

  const handleMonthChange = (date) => {
    if (requestAbortController.current) {
      requestAbortController.current.abort();
    }
    setMonth(date);
  };

  const handleAdd = () => {
    const requestBody = {
      GHabitDateId: 0,
      GHabitId: ghabit.gHabitId,
      DateOf: value.format('YYYY-MM-DDTHH:mm:ss'),
    };
    addAsync(requestBody).then(setOpen(true));
  };

  const handleRemove = () => {
    const requestBody = {
      id: ghabit.gHabitId,
      date: value.format('YYYY-MM-DDTHH:mm:ss'),
    };
    deleteAsync(requestBody);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const isSelected = highlightedDays?.data?.indexOf(value.date()) >= 0;

  return (
    <>
      <Styled.Calendar>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            value={value}
            loading={isLoading}
            renderLoading={() => <DayCalendarSkeleton />}
            onChange={(newValue) => setValue(newValue)}
            onMonthChange={handleMonthChange}
            onYearChange={handleMonthChange}
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
      <Notification open={open} onClose={handleClose} severity='success' type='ghabitAdd' />
    </>
  );
}
