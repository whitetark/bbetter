import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProgressBar from '@ramonak/react-progress-bar';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import React, { useState } from 'react';
import * as variables from '../../app/shared/colorVariables';
import * as Styled from '../../styles/BHabits.styled';
import Button from '../UI/Button';
import BHabitCalendar from './BHabitCalendar';
import BHabitClock from './BHabitClock';
dayjs.extend(duration);

function formatTimeSpan(milliseconds) {
  const timeDuration = dayjs.duration(milliseconds, 'milliseconds');

  let result = ``;

  if (timeDuration.days() > 0) {
    result += `${timeDuration.days()}d `;
  }

  if (timeDuration.hours() > 0) {
    result += `${timeDuration.hours()}h `;
  }

  result += `${timeDuration.minutes()}m ${timeDuration.seconds()}s`;
  return result;
}

const BHabitView = (props) => {
  const [timeDiff, setTimeDiff] = useState(0);

  const data = props.data;
  return (
    <>
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
          <Styled.BHabitViewStats onClick={props.onClick}>
            <div>
              Number of Entries: <span>{data.numOfEntries}</span>
            </div>
            <div>
              Minimum Interval: <span className='time'>{formatTimeSpan(data.minInterval)}</span>
            </div>
            <div>
              Average Interval: <span className='time'>{formatTimeSpan(data.avgInterval)}</span>
            </div>
            <div>
              Maximum Interval: <span className='time'>{formatTimeSpan(data.maxInterval)}</span>
            </div>
          </Styled.BHabitViewStats>
          <Styled.BHabitViewItem>
            <div className='item-content'>
              <div className='time-content'>
                <div className='time'>Abstinence Time</div>
                <span>
                  <BHabitClock
                    issueDate={data.lastDate}
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
    </>
  );
};

export default BHabitView;
