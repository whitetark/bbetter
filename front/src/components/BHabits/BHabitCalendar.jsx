import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Badge } from '@mui/material';
import { DayCalendarSkeleton, PickersDay } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { BHabitService } from '../../app/services/api';
import { useAddBHabitDate, useDeleteBHabitDate } from '../../hooks/use-bhabits';
import * as Styled from '../../styles/BHabits.styled';
import Button from '../UI/Button';

const findBHabitDateIdByDay = (data, day) => {
  const result = data.find((item) => {
    const itemDay = new Date(item.dateOf).getDate();
    return itemDay === day;
  });
  return result ? result.bHabitDateId : null;
};

function ServerDay(props) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !props.outsideCurrentMonth && highlightedDays?.data?.days?.indexOf(props.day.date()) >= 0;

  return (
    <>
      {isSelected ? (
        <Badge key={props.day.toString()} overlap='circular' badgeContent={isSelected && '💢'}>
          <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
        </Badge>
      ) : (
        <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
      )}
    </>
  );
}

export default function BHabitCalendar({ bhabit }) {
  const requestAbortController = useRef(null);

  const [value, setValue] = useState(dayjs(new Date()));
  const [month, setMonth] = useState(dayjs(new Date()));

  const { mutateAsync: addAsync } = useAddBHabitDate();
  const { mutateAsync: deleteAsync } = useDeleteBHabitDate();
  const valueForPayload = month || value;

  const payload = {
    id: bhabit.bHabitId,
    month: valueForPayload.month() + 1,
    year: valueForPayload.year(),
  };

  const { data: highlightedDays, isLoading } = useQuery(
    ['getBDatesByMonth', payload],
    () => {
      const controller = new AbortController();
      requestAbortController.current = controller;
      return BHabitService.getDatesByMonth({ ...payload, signal: controller.signal });
    },
    {
      onError: (error) => {
        console.log('Get BHabits Date error: ' + error.message);
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
      BHabitDateId: 0,
      BHabitId: bhabit.bHabitId,
      DateOf: value.format('YYYY-MM-DDTHH:mm:ss'),
    };
    addAsync(requestBody);
  };

  const handleRemove = () => {
    const id = findBHabitDateIdByDay(highlightedDays?.data?.dates, value.date());
    const requestBody = {
      id: id,
    };
    deleteAsync(requestBody);
  };

  const isSelected = highlightedDays?.data?.days?.indexOf(value.date()) >= 0;

  return (
    <Styled.Calendar>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          value={value}
          loading={isLoading}
          renderLoading={() => <DayCalendarSkeleton />}
          onChange={(newValue) => setValue(newValue)}
          disableFuture
          onMonthChange={handleMonthChange}
          onYearChange={handleMonthChange}
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
