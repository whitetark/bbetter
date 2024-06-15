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
import Notification from '../UI/Notification';

const findBHabitDateIdByDay = (data, day) => {
  const result = data.find((item) => {
    const itemDay = new Date(item.dateOf).getDate();
    return itemDay === day;
  });
  return result ? result.bHabitDateId : null;
};

function ServerDay(props) {
  const { highlightedDays = [], day, outsideCurrentMonth, issueDate, ...other } = props;

  const isIssueDate =
    dayjs(props.day).format('DD/MM/YYYY') === dayjs(issueDate).format('DD/MM/YYYY');

  const isSelected =
    !props.outsideCurrentMonth && highlightedDays?.data?.days?.indexOf(props.day.date()) >= 0;

  let badgeContent = '💢';
  if (isIssueDate) {
    badgeContent = '📆';
  }
  return (
    <>
      {isSelected || isIssueDate ? (
        <Badge key={props.day.toString()} overlap='circular' badgeContent={badgeContent}>
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
  const [open, setOpen] = useState(false);

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
    addAsync(requestBody).then(setOpen(true));
  };

  const handleRemove = () => {
    const id = findBHabitDateIdByDay(highlightedDays?.data?.dates, value.date());
    const requestBody = {
      id: id,
    };
    deleteAsync(requestBody);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const isSelected = highlightedDays?.data?.days?.indexOf(value.date()) >= 0;
  return (
    <>
      <Styled.Calendar>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            value={value}
            loading={isLoading}
            renderLoading={() => <DayCalendarSkeleton />}
            onChange={(newValue) => setValue(newValue)}
            disableFuture
            shouldDisableDate={(date) => {
              const issueDate = dayjs(bhabit.issueDate);
              const otherDate = dayjs(date);

              return issueDate > otherDate;
            }}
            onMonthChange={handleMonthChange}
            onYearChange={handleMonthChange}
            slots={{
              day: ServerDay,
            }}
            slotProps={{
              day: {
                highlightedDays,
                issueDate: dayjs(bhabit.issueDate),
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
      <Notification open={open} onClose={handleClose} severity='error' type='bhabitAdd' />
    </>
  );
}
