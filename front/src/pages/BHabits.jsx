import React from 'react';
import BHabitItem from '../components/BHabits/BHabitItem';
import Button from '../components/UI/Button';
import * as Styled from '../styles/BHabits.styled';

const BHabitsPage = () => {
  return (
    <Styled.BHabitContent>
      <h1>Bad Habits</h1>
      <Styled.BHabitMain>
        <Styled.BHabitList>
          <BHabitItem />
          <BHabitItem />
          <BHabitItem />
          <BHabitItem />
        </Styled.BHabitList>
        <Styled.BHabitActions>
          <Button>Show Bad Habits</Button>
          <Button className='active'>Add Bad Habit</Button>
        </Styled.BHabitActions>
      </Styled.BHabitMain>
    </Styled.BHabitContent>
  );
};

export default BHabitsPage;
