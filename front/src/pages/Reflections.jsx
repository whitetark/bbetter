import dayjs from 'dayjs';
import isBetweenPlugin from 'dayjs/plugin/isBetween';
import updateLocale from 'dayjs/plugin/updateLocale';
import React, { useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { ReflectService } from '../app/services/api';
import { useAuthContext } from '../app/store/auth-context';
import ReflectionItemBlock from '../components/Reflections/ReflectionAddBlock';
import ReflectionCalendar from '../components/Reflections/ReflectionCalendar';
import ReflectionGraphic from '../components/Reflections/ReflectionGraphic';
import * as Styled from '../styles/Reflections.styled';

dayjs.extend(isBetweenPlugin);
dayjs.extend(updateLocale);

dayjs.updateLocale('en', {
  weekStart: 1,
});

const findSundayReflectionByDay = (data, day) => {
  if (data === undefined) {
    return null;
  }

  let givenWeekSunday = dayjs(day).startOf('week').add(6, 'day');
  const result = data.data.find((obj) => {
    let objWeekSunday = dayjs(obj.dateOf).startOf('week').add(6, 'day');
    return objWeekSunday.isSame(givenWeekSunday);
  });

  return result ? result : null;
};

const ReflectionsPage = () => {
  const requestAbortController = useRef(null);
  const { userData } = useAuthContext();
  const [month, setMonth] = useState(dayjs(new Date()));
  const [value, setValue] = useState(() => {
    const sunday = dayjs().day(0);
    const now = dayjs(new Date());
    if (now > sunday || now == sunday) {
      return sunday;
    }

    return now;
  });

  const valueForPayload = month || value;
  const payload = {
    id: userData.accountId,
    month: valueForPayload.month() + 1,
    year: valueForPayload.year(),
  };

  const { data: reflects, isLoading } = useQuery(
    ['getReflectsByMonth', payload],
    () => {
      const controller = new AbortController();
      requestAbortController.current = controller;
      return ReflectService.getDatesByMonth({ ...payload, signal: controller.signal });
    },
    {
      onError: (error) => {
        console.log('Get BHabits Date error: ' + error.message);
      },
      staleTime: 30000,
      enabled: !!month,
    },
  );

  const requestBody = {
    AccountId: userData.accountId,
  };
  const { data: stats, isLoading: statsIsLoading } = useQuery(
    ['getReflectStats', requestBody],
    () => ReflectService.getStats(requestBody),
    {
      onError: (error) => {
        console.log('Get Reflection Stats error: ' + error.message);
      },
      staleTime: 1000 * 60 * 15,
    },
  );

  const handleMonthChange = (date) => {
    if (requestAbortController.current) {
      requestAbortController.current.abort();
    }
    setMonth(date);
  };

  const highlightedDaysArray = reflects?.data.map((reflection) => {
    const dateOf = new Date(reflection?.dateOf);
    return dateOf.getDate();
  });

  const reflection = findSundayReflectionByDay(reflects, value);

  return (
    <Styled.ReflectionsContent>
      <h1>Reflections</h1>
      <Styled.ReflectionsMain>
        <Styled.ReflectionItems>
          <ReflectionCalendar
            value={value}
            setValue={setValue}
            highlightedDays={highlightedDaysArray}
            handleMonth={handleMonthChange}
          />
          <ReflectionItemBlock reflection={reflection} value={value} />
        </Styled.ReflectionItems>
        <Styled.ReflectionStats>
          <Styled.FutureItem>
            <h1>Last 28 Days Graph</h1>
            {stats ? (
              <ReflectionGraphic data={stats?.data} isLoading={isLoading} />
            ) : (
              <div>Not enough data</div>
            )}
          </Styled.FutureItem>
          <Styled.FutureItem className='advice'>
            <h1>Advice</h1>
            {stats && stats.length > 0 ? (
              <p>{stats?.data.advice}</p>
            ) : (
              <div>
                Try to do something you always want, because you emotion is much lower than
                productivity
              </div>
            )}
          </Styled.FutureItem>
        </Styled.ReflectionStats>
      </Styled.ReflectionsMain>
    </Styled.ReflectionsContent>
  );
};

export default ReflectionsPage;
