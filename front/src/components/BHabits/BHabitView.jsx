import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProgressBar from '@ramonak/react-progress-bar';
import React, { useState } from 'react';
import * as variables from '../../app/shared/colorVariables';
import * as Styled from '../../styles/BHabits.styled';
import Button from '../UI/Button';
import BHabitCalendar from './BHabitCalendar';
import BHabitClock from './BHabitClock';

const BHabitView = (props) => {
  const [timeDiff, setTimeDiff] = useState(0);

  const data = props.data;
  return (
    <Styled.BHabitView onClick={props.onClick}>
      <Styled.BHabitViewHeader>
        <div className='title'>{data.content}</div>
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
              <span>
                <BHabitClock
                  issueDate={data.issueDate}
                  timeDiff={timeDiff}
                  setTimeDiff={setTimeDiff}
                />
              </span>
            </div>
            <div className='perc'>{props.number}%</div>
          </div>
          <div className='progress-content'>
            <span>{props.limit}</span>
            <ProgressBar
              completed={props.number}
              maxCompleted={100}
              bgColor={variables.GREEN}
              baseBgColor={variables.TAB_HOVER}
              isLabelVisible={false}
              animateOnRender={true}
            />
          </div>
        </Styled.BHabitViewItem>
        <BHabitCalendar bhabit={data} />
      </Styled.BHabitViewMain>
    </Styled.BHabitView>
  );
};

export default BHabitView;
