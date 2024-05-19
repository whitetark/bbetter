import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useQuery } from 'react-query';
import { UserService } from '../../app/services/api';
import { useAuthContext } from '../../app/store/auth-context';
import * as Styled from '../../styles/Home.styled';

const Quote = () => {
  const { userData } = useAuthContext();
  const requestBody = {
    Id: userData.accountId,
  };

  const { data } = useQuery(
    ['getQuoteOfTheDay', requestBody],
    () => UserService.getQuoteOfTheDay(requestBody),
    {
      onError: (error) => {
        console.log('Get QuoteOfTheDay error: ' + error.message);
      },
      staleTime: 500000,
    },
  );

  const quote = data?.data;

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
