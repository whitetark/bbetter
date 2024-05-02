import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PathConstants from '../app/shared/pathConstants';
import { useWishContext } from '../app/store/wish-context';
import Button from '../components/UI/Button';
import Modal from '../components/UI/Modal';
import WishAdd from '../components/Wishes/WishAdd';
import WishListItem from '../components/Wishes/WishListItem';
import useEdit from '../hooks/use-edit';
import useModal from '../hooks/use-modal';
import * as Styled from '../styles/WishList.styled';

const WishListPage = () => {
  document.title = `bbetter - All Wishes`;
  const { isShowing: addIsShowing, toggle: toggleAdd } = useModal();
  const { isEditMode: isEdit, toggle: toggleEdit } = useEdit();
  const { wishes } = useWishContext();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(PathConstants.WISH);
  };

  wishes.sort((a, b) => {
    return a.isCompleted - b.isCompleted;
  });

  return (
    <>
      <Styled.WishList>
        <Styled.WishListHeader>
          <Button onClick={handleGoBack}>
            <FontAwesomeIcon icon='fa-solid fa-arrow-left' fixedWidth />
          </Button>
          <Styled.WishListActions>
            <Button onClick={toggleEdit} className={isEdit && 'active'}>
              <FontAwesomeIcon icon='fa-solid fa-pencil' fixedWidth />
            </Button>
            <Button onClick={toggleAdd}>
              <FontAwesomeIcon icon='fa-solid fa-plus' fixedWidth />
            </Button>
          </Styled.WishListActions>
        </Styled.WishListHeader>
        <Styled.WishListMain>
          {wishes.map((wish, index) => (
            <WishListItem key={index} isEdit={isEdit} data={wish} />
          ))}
        </Styled.WishListMain>
      </Styled.WishList>
      <Modal isShowing={addIsShowing} hide={toggleAdd} className='add-modal' hasOverlay>
        <WishAdd hide={toggleAdd} />
      </Modal>
    </>
  );
};

export default WishListPage;
