import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import AddQuote from '../components/Quotes/AddQuote';
import Quote from '../components/Quotes/Quote';
import Background from '../components/UI/Background';
import Button from '../components/UI/Button';
import Modal from '../components/UI/Modal';
import useModal from '../hooks/use-modal';
import * as Styled from '../styles/Quotes.styled';

const QuotesPage = () => {
  const { isShowing: modalIsShowing, toggle: toggleModal } = useModal();

  return (
    <Styled.QuotesPage>
      <Background />
      <Styled.QuoteContent>
        <Styled.QuoteHeader>
          <h1>Your Quotes</h1>
          <Styled.QuoteActions>
            <Button onClick={toggleModal}>
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
      <Modal isShowing={modalIsShowing} hide={toggleModal} className='add-modal' hasOverlay>
        <AddQuote />
      </Modal>
    </Styled.QuotesPage>
  );
};

export default QuotesPage;
