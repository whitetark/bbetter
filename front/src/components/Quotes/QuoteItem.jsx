import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import useModal from '../../hooks/use-modal';
import { useDeleteQuote } from '../../hooks/use-quote';
import * as Styled from '../../styles/Quotes.styled';
import Button from '../UI/Button';
import Confirmation from '../UI/Confirmation';
import Modal from '../UI/Modal';
import QuoteEdit from './QuoteEdit';

const QuoteItem = ({ isEdit, data }) => {
  const { isShowing: editIsShowing, toggle: toggleEdit } = useModal();
  const { isShowing: deleteIsShowing, toggle: toggleDelete } = useModal();

  const { mutateAsync } = useDeleteQuote();

  const handleDelete = (requestBody) => {
    mutateAsync(requestBody).then(toggleDelete());
  };

  const requestBody = {
    Id: data.userQuoteId,
  };

  return (
    <>
      <Styled.Quote>
        <div>
          <div className='content'>{data.quote}</div>
          <div className='author'>{data.author}</div>
        </div>
        {isEdit && (
          <Styled.QuoteItemActions>
            <Button onClick={toggleEdit}>
              <FontAwesomeIcon icon='fa-solid fa-pencil' fixedWidth />
            </Button>
            <Button onClick={toggleDelete}>
              <FontAwesomeIcon icon='fa-solid fa-trash-can' fixedWidth />
            </Button>
          </Styled.QuoteItemActions>
        )}
      </Styled.Quote>
      <Modal isShowing={editIsShowing} hide={toggleEdit} className='add-modal' hasOverlay>
        <QuoteEdit hide={toggleEdit} data={data} />
      </Modal>
      <Modal isShowing={deleteIsShowing} hide={toggleDelete} className='add-modal' hasOverlay>
        <Confirmation hide={toggleDelete} onDelete={() => handleDelete(requestBody)} />
      </Modal>
    </>
  );
};

export default QuoteItem;
