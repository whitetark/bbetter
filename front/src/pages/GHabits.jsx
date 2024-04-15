import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import GHabitItem from '../components/GHabits/GHabitItem';
import Button from '../components/UI/Button';
import * as Styled from '../styles/GHabits.styled';

const GHabitsPage = () => {
  return (
    <Styled.GHabitContent>
      <Styled.GHabitHeader>
        <h1>Good Habits</h1>
        <Styled.GHabitActions>
          <Button>
            <FontAwesomeIcon icon='fa-solid fa-plus' fixedWidth />
          </Button>
        </Styled.GHabitActions>
      </Styled.GHabitHeader>
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
        </Styled.GHabitTableHeader>
        <GHabitItem />
        <GHabitItem />
        <GHabitItem />
        <GHabitItem />
        <GHabitItem />
      </Styled.GHabitList>
    </Styled.GHabitContent>
  );
};

export default GHabitsPage;
