import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import useModal from '../../hooks/use-modal';
import * as Styled from '../../styles/WishList.styled';
import TaskEdit from '../Tasks/TaskEdit';
import Button from '../UI/Button';
import Confirmation from '../UI/Confirmation';
import Modal from '../UI/Modal';

const WishListItem = ({ isEdit }) => {
  const [isChecked, setIsChecked] = useState(false);
  const { isShowing: editIsShowing, toggle: toggleEdit } = useModal();
  const { isShowing: deleteIsShowing, toggle: toggleDelete } = useModal();

  return (
    <>
      <Styled.WishListItem className={isChecked ? 'checked' : ''}>
        <Styled.Input
          type='checkbox'
          value={isChecked}
          onClick={(event) => setIsChecked(event.target.checked)}
        />
        <div className='content'>
          contentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcocontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentntentcontentcontentcontentcontentcontentcontent
          contentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontent
        </div>
        {isEdit && (
          <Styled.WishListItemActions>
            <Button onClick={toggleEdit} className={isEdit && 'active'}>
              <FontAwesomeIcon icon='fa-solid fa-pencil' fixedWidth />
            </Button>
            <Button onClick={toggleDelete}>
              <FontAwesomeIcon icon='fa-solid fa-trash-can' fixedWidth />
            </Button>
          </Styled.WishListItemActions>
        )}
      </Styled.WishListItem>
      <Modal isShowing={editIsShowing} hide={toggleEdit} className='task-modal' hasOverlay>
        <TaskEdit />
      </Modal>
      <Modal isShowing={deleteIsShowing} hide={toggleDelete} className='task-modal' hasOverlay>
        <Confirmation hide={toggleDelete} />
      </Modal>
    </>
  );
};

export default WishListItem;
