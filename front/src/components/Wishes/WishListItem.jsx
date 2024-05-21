import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import useModal from '../../hooks/use-modal';
import { useDeleteWish, useEditWish } from '../../hooks/use-wish';
import * as Styled from '../../styles/WishList.styled';
import Button from '../UI/Button';
import Confirmation from '../UI/Confirmation';
import Modal from '../UI/Modal';
import WishEdit from './WishEdit';

const WishListItem = ({ isEdit, data }) => {
  const [isChecked, setIsChecked] = useState(data.isCompleted);
  const [initialRender, setInitialRender] = useState(false);
  const { isShowing: editIsShowing, toggle: toggleEdit } = useModal();
  const { isShowing: deleteIsShowing, toggle: toggleDelete } = useModal();

  const { mutateAsync: editAsync } = useEditWish();
  const { mutateAsync: deleteAsync } = useDeleteWish();

  useEffect(() => {
    if (!initialRender) {
      setInitialRender(true);
      return;
    }

    const timer = setTimeout(() => {
      const task = {
        ...data,
        isCompleted: isChecked,
        completeDate: dayjs().format(),
      };

      if (data.isCompleted == isChecked) {
        return;
      }

      editAsync(task);
    }, 3000);

    return () => clearTimeout(timer);
  }, [isChecked]);

  const handleDelete = (requestBody) => {
    deleteAsync(requestBody).then(toggleDelete());
  };

  const requestBody = {
    Id: data.wishId,
  };

  return (
    <>
      <Styled.WishListItem className={isChecked ? 'checked' : ''}>
        <div className='number'>1</div>
        <div className='content'>{data.content}</div>
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
        <Styled.Input
          type='checkbox'
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
        />
      </Styled.WishListItem>
      <Modal isShowing={editIsShowing} hide={toggleEdit} className='add-modal' hasOverlay>
        <WishEdit hide={toggleEdit} data={data} />
      </Modal>
      <Modal isShowing={deleteIsShowing} hide={toggleDelete} className='add-modal' hasOverlay>
        <Confirmation hide={toggleDelete} onDelete={() => handleDelete(requestBody)} />
      </Modal>
    </>
  );
};

export default WishListItem;
