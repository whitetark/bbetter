import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import * as Styled from '../../styles/Home.styled';

const Quote = () => {
  return (
    <Styled.Quote>
      <FontAwesomeIcon icon='fa-solid fa-quote-left' fixedWidth />
      <Styled.QuoteData>
        <p className='wisdom'>You`ve gotta dance like nobody watching</p>
        <span className='author'>Simon Sinek</span>
      </Styled.QuoteData>
    </Styled.Quote>
  );
};

export default Quote;
