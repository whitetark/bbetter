import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import BHabitItem from '../components/BHabits/BHabitItem';
import Button from '../components/UI/Button';
import * as Styled from '../styles/BHabits.styled';

const BHabitsPage = () => {
  return (
    <Styled.BHabitContent>
      <Styled.BHabitHeader>
        <h1>Bad Habits</h1>
        <Styled.BHabitActions>
          <Button>
            <FontAwesomeIcon icon='fa-solid fa-plus' fixedWidth />
          </Button>
        </Styled.BHabitActions>
      </Styled.BHabitHeader>
      <Styled.BHabitList>
        <BHabitItem />
        <BHabitItem />
        <BHabitItem />
        <BHabitItem />
        <BHabitItem />
        <BHabitItem />
        <BHabitItem />
        <BHabitItem />
      </Styled.BHabitList>
    </Styled.BHabitContent>
  );
};

export default BHabitsPage;
