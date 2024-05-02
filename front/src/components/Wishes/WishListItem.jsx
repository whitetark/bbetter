import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useWishContext } from '../../app/store/wish-context';
import useModal from '../../hooks/use-modal';
import * as Styled from '../../styles/WishList.styled';
import Button from '../UI/Button';
import Confirmation from '../UI/Confirmation';
import Modal from '../UI/Modal';
import WishEdit from './WishEdit';

const WishListItem = ({ isEdit, data }) => {
  const isChecked = data.isCompleted;
  const { isShowing: editIsShowing, toggle: toggleEdit } = useModal();
  const { isShowing: deleteIsShowing, toggle: toggleDelete } = useModal();

  const { editWish, deleteWish } = useWishContext();

  const handleDelete = (requestBody) => {
    deleteWish.mutateAsync(requestBody).then(toggleDelete());
  };

  const handleEdit = (event) => {
    const wish = {
      ...data,
      isCompleted: event.target.checked,
    };
    editWish.mutateAsync(wish);
  };

  const requestBody = {
    Id: data.wishId,
  };

  return (
    <>
      <Styled.WishListItem className={isChecked ? 'checked' : ''}>
        <Styled.Input type='checkbox' checked={isChecked} onChange={handleEdit} />
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
