import React from 'react';
import GHabitItem from '../components/GHabits/GHabitItem';
import Button from '../components/UI/Button';
import * as Styled from '../styles/GHabits.styled';

const GHabitsPage = () => {
  return (
    <Styled.GHabitContent>
      <h1>Good Habits</h1>
      <Styled.GHabitList>
        <Styled.GHabitHeader>
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
        </Styled.GHabitHeader>
        <GHabitItem />
        <GHabitItem />
        <GHabitItem />
        <GHabitItem />
        <GHabitItem />
      </Styled.GHabitList>
      <Styled.GHabitActions>
        <Button>Show Wish List</Button>
        <Button className='active'>Add New Wish</Button>
      </Styled.GHabitActions>
    </Styled.GHabitContent>
  );
};

export default GHabitsPage;
