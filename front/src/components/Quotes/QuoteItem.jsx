import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import useModal from '../../hooks/use-modal';
import * as Styled from '../../styles/Quotes.styled';
import Button from '../UI/Button';
import Confirmation from '../UI/Confirmation';
import Modal from '../UI/Modal';
import EditQuote from './EditQuote';

const QuoteItem = ({ isEdit }) => {
  const { isShowing: editIsShowing, toggle: toggleEdit } = useModal();
  const { isShowing: deleteIsShowing, toggle: toggleDelete } = useModal();

  return (
    <>
      <Styled.Quote>
        <div>
          <div className='content'>Be Better Bro!</div>
          <div className='author'>Steven King</div>
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
      <Modal isShowing={editIsShowing} hide={toggleEdit} className='task-modal' hasOverlay>
        <EditQuote />
      </Modal>
      <Modal isShowing={deleteIsShowing} hide={toggleDelete} className='task-modal' hasOverlay>
        <Confirmation hide={toggleDelete} />
      </Modal>
    </>
  );
};

export default QuoteItem;
