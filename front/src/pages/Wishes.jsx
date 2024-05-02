import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PathConstants from '../app/shared/pathConstants';
import { useWishContext } from '../app/store/wish-context';
import { Button, Modal } from '../components/UI/index';
import { WishAdd, WishItem } from '../components/index';
import useModal from '../hooks/use-modal';
import * as Styled from '../styles/Wishes.styled';

const WishesPage = () => {
  document.title = `bbetter - Wishes`;
  const { isShowing: modalIsShowing, toggle: toggleModal } = useModal();
  const { wishes, refetchWishes } = useWishContext();
  const navigate = useNavigate();

  useEffect(() => {
    refetchWishes();
  }, []);

  const handleClick = () => {
    navigate(PathConstants.WISH_LIST);
  };

  wishes.sort((a, b) => {
    return a.isCompleted - b.isCompleted;
  });

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
        {wishes.slice(0, 6).map((wish, index) => (
          <WishItem key={index} data={wish} />
        ))}
      </Styled.WishList>
      <Modal isShowing={modalIsShowing} hide={toggleModal} className='add-modal' hasOverlay>
        <WishAdd hide={toggleModal} />
      </Modal>
    </Styled.WishContent>
  );
};

export default WishesPage;
