import { Box, CircularProgress, Typography, circularProgressClasses } from '@mui/material';
import React from 'react';
import * as variables from '../../app/shared/colorVariables';
import * as Styled from '../../styles/GHabits.styled';

export function CircularProgressWithLabel(props) {
  const settings = {
    thickness: 3,
    size: 200,
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
        <Typography
          variant='caption'
          component='div'
          className='label'
          sx={{ fontSize: 32, fontWeight: 500 }}>
          {`${Math.round(props.habitentries)}`}/{`${Math.round(props.maxhabitentries)}`}
        </Typography>
      </Box>
    </Box>
  );
}

const GHabitDiagram = ({ ghabits }) => {
  const maxHabitEntries = ghabits?.length * 7;

  const habitEntries = ghabits?.reduce((total, ghabit) => {
    return (total += ghabit.gHabitDates.length);
  }, 0);

  const percentage = (100 / maxHabitEntries) * habitEntries;

  return (
    <Styled.GHabitDiagram>
      <CircularProgressWithLabel
        value={percentage}
        habitentries={habitEntries}
        maxhabitentries={maxHabitEntries}
      />
    </Styled.GHabitDiagram>
  );
};

export default GHabitDiagram;
