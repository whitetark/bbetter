import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProgressBar from '@ramonak/react-progress-bar';
import React, { useState } from 'react';
import * as variables from '../../app/shared/colorVariables';
import * as Styled from '../../styles/BHabits.styled';
import Button from '../UI/Button';
import BHabitCalendar from './BHabitCalendar';

const BHabitView = (props) => {
  const [number, setNumber] = useState(29.1);
  return (
    <Styled.BHabitView onClick={props.onClick}>
      <Styled.BHabitViewHeader>
        <div className='title'>Smoking</div>
        <Styled.BHabitViewActions>
          <Button onClick={props.toggleEdit}>
            <FontAwesomeIcon icon='fa-solid fa-pencil' fixedWidth />
          </Button>
          <Button onClick={props.toggleDelete}>
            <FontAwesomeIcon icon='fa-solid fa-trash-can' fixedWidth />
          </Button>
        </Styled.BHabitViewActions>
      </Styled.BHabitViewHeader>
      <Styled.BHabitViewMain>
        <Styled.BHabitViewItem>
          <div className='item-content'>
            <div className='time-content'>
              <div className='time'>Abstinence Time</div>
              <span>1d 22h 36m 53s</span>
            </div>
            <div className='perc'>{number}%</div>
          </div>
          <div className='progress-content'>
            <span>1 week</span>
            <ProgressBar
              completed={number}
              maxCompleted={100}
              bgColor={variables.GREEN}
              baseBgColor={variables.TAB_HOVER}
              isLabelVisible={false}
              animateOnRender={true}
            />
          </div>
        </Styled.BHabitViewItem>
        <BHabitCalendar />
      </Styled.BHabitViewMain>
    </Styled.BHabitView>
  );
};

export default BHabitView;
