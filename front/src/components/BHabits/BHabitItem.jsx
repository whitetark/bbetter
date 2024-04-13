import ProgressBar from '@ramonak/react-progress-bar';
import React, { useState } from 'react';
import * as variables from '../../app/shared/colorVariables';
import * as Styled from '../../styles/BHabits.styled';

const BHabitItem = () => {
  const [number, setNumber] = useState(29.1);

  return (
    <Styled.BHabitItem>
      <div className='title'>Smoking</div>
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
          baseBgColor={variables.WHITE}
          isLabelVisible={false}
          animateOnRender={true}
        />
      </div>
    </Styled.BHabitItem>
  );
};

export default BHabitItem;
