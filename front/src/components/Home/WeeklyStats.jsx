import { Box, CircularProgress, Typography, circularProgressClasses } from '@mui/material';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { UserService } from '../../app/services/api';
import * as variables from '../../app/shared/colorVariables';
import { useAuthContext } from '../../app/store/auth-context';
import * as Styled from '../../styles/Home.styled';
import LoadingWrapper from '../UI/LoadingWrapper';

export function CircularProgressWithLabel(props) {
  const settings = {
    thickness: 3,
    size: 150,
  };

  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress
        variant='determinate'
        size={settings.size}
        thickness={settings.thickness}
        {...props}
        sx={{
          color: variables.TAB_HOVER,
          position: 'absolute',
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: 'round',
          },
        }}
        value={100}
      />
      <CircularProgress
        variant='determinate'
        size={settings.size}
        thickness={settings.thickness}
        {...props}
        sx={{ color: variables.GREEN }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Typography variant='caption' component='div' className='label'>
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

const WeeklyStats = () => {
  const [period, setPeriod] = useState('week');

  const { userData } = useAuthContext();
  const requestBody = {
    Id: userData.accountId,
    Type: period,
  };

  const { data, isLoading } = useQuery(
    ['getStatistics', requestBody],
    () => UserService.getStatistics(requestBody),
    {
      onError: (error) => {
        console.log('Get Statistics error: ' + error.message);
      },
      staleTime: 500000,
    },
  );

  const changeHandler = (event) => {
    setPeriod(event.target.value);
  };

  const stats = data?.data;

  var value = stats ? stats.productivityCoef : 0;

  if (value > 100) {
    value = 100;
  }
  return (
    <Styled.WeeklyStats>
      <Styled.StatsHeader>
        <h1>Statistics</h1>
        <select name='period' value={period} onChange={changeHandler}>
          <option value='week'>Last Week</option>
          <option value='month'>Last Month</option>
          <option value='3month'>Last 3 Months</option>
        </select>
      </Styled.StatsHeader>
      <LoadingWrapper isLoading={isLoading}>
        {stats ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '2rem',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Styled.StatsMain>
              <Styled.StatsBlock>
                <h1>Tasks</h1>
                <p>
                  In Time Completion Rate: <span>{stats?.taskCompletionRate}%</span>
                </p>
                <p>
                  Completed: <span>{stats?.taskCompletedNum}</span>
                </p>
                <p>
                  Completed Extra: <span>{stats?.taskCompletedExtra}</span>
                </p>
              </Styled.StatsBlock>
              <Styled.StatsBlock>
                <h1>Wishes</h1>
                <p>
                  Completed: <span>{stats.wishesCompleteNum}</span>
                </p>
              </Styled.StatsBlock>
              <Styled.StatsBlock>
                <h1>Good Habits</h1>
                <p>
                  Completion Rate: <span>{stats.gHabitCompletionRate}%</span>
                </p>
                <p>
                  Fully Completed: <span>{stats.gHabitFullyCompleted}</span>
                </p>
              </Styled.StatsBlock>
            </Styled.StatsMain>
            <Styled.Productivity>
              <CircularProgressWithLabel value={value} />
              <span>Productivity</span>
            </Styled.Productivity>
          </div>
        ) : (
          <div>Not enough data :(</div>
        )}
      </LoadingWrapper>
    </Styled.WeeklyStats>
  );
};

export default WeeklyStats;
