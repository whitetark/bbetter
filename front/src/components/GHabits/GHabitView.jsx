import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import * as Styled from '../../styles/GHabits.styled';
import Button from '../UI/Button';
import GHabitCalendar from './GHabitCalendar';

const GHabitView = (props) => {
  const data = props.data;
  return (
    <>
      <Styled.GHabitView onClick={props.onClick}>
        <Styled.GHabitViewHeader>
          <Styled.GHabitViewActions>
            <Button onClick={props.toggleEdit}>
              <FontAwesomeIcon icon='fa-solid fa-pencil' fixedWidth />
            </Button>
            <Button onClick={props.toggleDelete}>
              <FontAwesomeIcon icon='fa-solid fa-trash-can' fixedWidth />
            </Button>
          </Styled.GHabitViewActions>
        </Styled.GHabitViewHeader>
        <Styled.GHabitViewMain>
          <p className='content'>{data.content}</p>
          <GHabitCalendar ghabit={data} />
        </Styled.GHabitViewMain>
      </Styled.GHabitView>
    </>
  );
};

export default GHabitView;
