import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { QuoteService } from '../../app/services/api';
import { useAuthContext } from '../../app/store/auth-context';
import * as Styled from '../../styles/Home.styled';

const Quote = () => {
  const queryClient = useQueryClient();
  const { userData } = useAuthContext();
  const requestBody = {
    accountId: userData.accountId,
  };

  const { data } = useQuery(
    ['getQuoteOfTheDay', requestBody],
    () => QuoteService.getQuoteOfTheDay(requestBody),
    {
      onError: (error) => {
        console.log('Get Quote Of The Day error: ' + error.message);
      },
      staleTime: 30000,
    },
  );

  return (
    <Styled.Quote>
      <FontAwesomeIcon icon='fa-solid fa-quote-left' fixedWidth />
      <Styled.QuoteData>
        <p className='wisdom'>{data?.data.content}</p>
        <span className='author'>{data?.data.author}</span>
      </Styled.QuoteData>
    </Styled.Quote>
  );
};

export default Quote;
