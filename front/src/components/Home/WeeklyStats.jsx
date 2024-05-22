import { Box, CircularProgress, Typography, circularProgressClasses } from '@mui/material';
import React from 'react';
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
  const { userData } = useAuthContext();
  const requestBody = {
    Id: userData.accountId,
    Type: 'week',
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

  const stats = data?.data;

  return (
    <Styled.WeeklyStats>
      <LoadingWrapper isLoading={isLoading}>
        {stats ? (
          <>
            <Styled.StatsMain>
              <h1>Weekly Stats</h1>
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
              <CircularProgressWithLabel value={stats.productivityCoef} />
              <span>Productivity This Week</span>
            </Styled.Productivity>
          </>
        ) : (
          <div>Not enough data :(</div>
        )}
      </LoadingWrapper>
    </Styled.WeeklyStats>
  );
};

export default WeeklyStats;
