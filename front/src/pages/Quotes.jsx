import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Quote from '../components/Quotes/Quote';
import Background from '../components/UI/Background';
import Button from '../components/UI/Button';
import * as Styled from '../styles/Quotes.styled';

const QuotesPage = () => {
  return (
    <Styled.QuotesPage>
      <Background />
      <Styled.QuoteContent>
        <Styled.QuoteHeader>
          <h1>Your Quotes</h1>
          <Styled.QuoteActions>
            <Button>
              <FontAwesomeIcon icon='fa-solid fa-plus' />
            </Button>
          </Styled.QuoteActions>
        </Styled.QuoteHeader>
        <Styled.QuoteList>
          <Quote />
          <Quote />
          <Quote />
          <Quote />
        </Styled.QuoteList>
      </Styled.QuoteContent>
    </Styled.QuotesPage>
  );
};

export default QuotesPage;
