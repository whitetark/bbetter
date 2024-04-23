import React, { useState } from 'react';
import * as Styled from '../../styles/Wishes.styled';

const WishItem = () => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <Styled.WishItem className={isChecked ? 'checked' : ''}>
      <Styled.Input
        type='checkbox'
        value={isChecked}
        onClick={(event) => setIsChecked(event.target.checked)}
      />
      <div className='content'>
        contentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcocontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentntentcontentcontentcontentcontentcontentcontent
        contentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontent
      </div>
    </Styled.WishItem>
  );
};

export default WishItem;
