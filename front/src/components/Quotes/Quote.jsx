import React from 'react';
import * as Styled from '../../styles/Quotes.styled';

const Quote = () => {
  return (
    <Styled.Quote>
      <div className='content'>Be Better Bro!</div>
      <div className='author'>Steven King</div>
    </Styled.Quote>
  );
};

export default Quote;
