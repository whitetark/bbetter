import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PathConstants from '../app/shared/pathConstants';
import Button from '../components/UI/Button';
import Modal from '../components/UI/Modal';
import WishAdd from '../components/Wishes/WishAdd';
import WishItem from '../components/Wishes/WishItem';
import useModal from '../hooks/use-modal';
import * as Styled from '../styles/Wishes.styled';

const WishesPage = () => {
  document.title = `bbetter - Wishes`;
  const { isShowing: modalIsShowing, toggle: toggleModal } = useModal();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(PathConstants.WISH_LIST);
  };

  return (
    <Styled.WishContent>
      <Styled.WishHeader>
        <h1>Wish List</h1>
        <Styled.WishActions>
          <Button onClick={handleClick}>
            <FontAwesomeIcon icon='fa-solid fa-list' fixedWidth />
          </Button>
          <Button onClick={toggleModal} className={modalIsShowing ? 'active' : ''}>
            <FontAwesomeIcon icon='fa-solid fa-plus' fixedWidth />
          </Button>
        </Styled.WishActions>
      </Styled.WishHeader>
      <Styled.WishList>
        {[...Array(6)].map((_, index) => (
          <WishItem key={index} />
        ))}
      </Styled.WishList>
      <Modal isShowing={modalIsShowing} hide={toggleModal} className='add-modal' hasOverlay>
        <WishAdd />
      </Modal>
    </Styled.WishContent>
  );
};

export default WishesPage;
