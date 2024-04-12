import React, { useState } from 'react';
import * as Styled from '../../styles/GHabits.styled';
import Checklist from './Checklist';

const GHabitItem = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckList = (value) => {
    setIsChecked(value);
  };

  return (
    <Styled.GHabitItem className={isChecked ? 'checked' : ''}>
      <div className='number'>1</div>
      <div>content</div>
      <Checklist onChange={handleCheckList} />
    </Styled.GHabitItem>
  );
};

export default GHabitItem;
