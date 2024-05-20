import React from 'react';
import * as Styled from '../../styles/GHabits.styled';
import GHabitItem from './GHabitItem';

const GHabitList = ({ ghabits }) => {
  return (
    <Styled.GHabitList>
      <Styled.GHabitTableHeader>
        <div></div>
        <div></div>
        <div className='weeks-list'>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
          <div>Sun</div>
        </div>
        <div></div>
      </Styled.GHabitTableHeader>
      {ghabits.map((ghabit) => (
        <GHabitItem key={ghabit.gHabitId} data={ghabit} />
      ))}
    </Styled.GHabitList>
  );
};

export default GHabitList;
