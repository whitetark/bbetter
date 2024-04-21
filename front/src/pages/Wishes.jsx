import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Button from '../components/UI/Button';
import Modal from '../components/UI/Modal';
import AddWish from '../components/Wishes/AddWish';
import WishItem from '../components/Wishes/WishItem';
import useModal from '../hooks/use-modal';
import * as Styled from '../styles/Wishes.styled';

const WishesPage = () => {
  document.title = `bbetter - Wishes`;
  const { isShowing: modalIsShowing, toggle: toggleModal } = useModal();

  return (
    <Styled.WishContent>
      <Styled.WishHeader>
        <h1>Wish List</h1>
        <Styled.WishActions>
          <Button>
            <FontAwesomeIcon icon='fa-solid fa-list' fixedWidth />
          </Button>
          <Button onClick={toggleModal} className={modalIsShowing ? 'active' : ''}>
            <FontAwesomeIcon icon='fa-solid fa-plus' fixedWidth />
          </Button>
        </Styled.WishActions>
      </Styled.WishHeader>
      <Styled.WishList>
        <WishItem />
        <WishItem />
        <WishItem />
        <WishItem />
        <WishItem />
        <WishItem />
      </Styled.WishList>
      <Modal isShowing={modalIsShowing} hide={toggleModal} className='add-modal' hasOverlay>
        <AddWish />
      </Modal>
    </Styled.WishContent>
  );
};

export default WishesPage;
