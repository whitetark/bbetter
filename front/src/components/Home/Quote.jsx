import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import * as Styled from '../../styles/Home.styled';

const Quote = ({ quote }) => {
  return (
    quote && (
      <Styled.Quote>
        <FontAwesomeIcon icon='fa-solid fa-quote-left' fixedWidth />
        <Styled.QuoteData>
          <p className='wisdom'>{quote.content}</p>
          <span className='author'>{quote.author}</span>
        </Styled.QuoteData>
      </Styled.Quote>
    )
  );
};

export default Quote;
