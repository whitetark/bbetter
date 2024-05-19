import { Box, CircularProgress, Typography, circularProgressClasses } from '@mui/material';
import React from 'react';
import * as variables from '../../app/shared/colorVariables';
import * as Styled from '../../styles/Home.styled';

function CircularProgressWithLabel(props) {
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

const WeeklyStats = ({ stats }) => {
  return (
    stats && (
      <Styled.WeeklyStats>
        <Styled.StatsMain>
          <Styled.StatsBlock>
            <h1>Tasks</h1>
            <p>
              Completion Rate: <span>{stats?.taskCompletionRate}%</span>
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
              Completed: <span>{stats.gHabitFullyCompleted}</span>
            </p>
          </Styled.StatsBlock>
        </Styled.StatsMain>
        <Styled.Productivity>
          <CircularProgressWithLabel value={stats.productivityCoef} />
          <span>Productivity Coefficient</span>
        </Styled.Productivity>
      </Styled.WeeklyStats>
    )
  );
};

export default WeeklyStats;
