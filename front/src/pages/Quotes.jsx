import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { useQuoteContext } from '../app/store/quote-context';
import QuoteAdd from '../components/Quotes/QuoteAdd';
import QuoteItem from '../components/Quotes/QuoteItem';
import Background from '../components/UI/Background';
import Button from '../components/UI/Button';
import Modal from '../components/UI/Modal';
import useEdit from '../hooks/use-edit';
import useModal from '../hooks/use-modal';
import * as Styled from '../styles/Quotes.styled';

const QuotesPage = () => {
  const { isShowing: modalIsShowing, toggle: toggleModal } = useModal();
  const { isEditMode: isEdit, toggle: toggleEdit } = useEdit();
  const { quotes, refetchQuotes } = useQuoteContext();
  document.title = `bbetter - Quotes`;

  useEffect(() => {
    refetchQuotes();
  }, []);

  return (
    <Styled.QuotesPage>
      <Background />
      <Styled.QuoteContent>
        <Styled.QuoteHeader>
          <h1>Your Quotes</h1>
          <Styled.QuoteActions>
            <Button onClick={toggleEdit} className={isEdit && 'active'}>
              <FontAwesomeIcon icon='fa-solid fa-pencil' fixedWidth />
            </Button>
            <Button onClick={toggleModal}>
              <FontAwesomeIcon icon='fa-solid fa-plus' fixedWidth />
            </Button>
          </Styled.QuoteActions>
        </Styled.QuoteHeader>
        <Styled.QuoteList>
          {quotes.map((quote, index) => (
            <QuoteItem key={index} isEdit={isEdit} data={quote} />
          ))}
        </Styled.QuoteList>
      </Styled.QuoteContent>
      <Modal isShowing={modalIsShowing} hide={toggleModal} className='add-modal' hasOverlay>
        <QuoteAdd hide={toggleModal} />
      </Modal>
    </Styled.QuotesPage>
  );
};

export default QuotesPage;
