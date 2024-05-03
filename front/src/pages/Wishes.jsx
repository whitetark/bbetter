import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import PathConstants from '../app/shared/pathConstants';
import { Button, Modal } from '../components/UI/index';
import { WishAdd, WishItem } from '../components/index';
import useModal from '../hooks/use-modal';
import { useRefetchWishes } from '../hooks/use-wish';
import * as Styled from '../styles/Wishes.styled';

const WishesPage = () => {
  document.title = `bbetter - Wishes`;
  const { isShowing: modalIsShowing, toggle: toggleModal } = useModal();
  const { wishes, error, isLoading } = useRefetchWishes();
  const navigate = useNavigate();

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
        {wishes.slice(0, 6).map((wish) => (
          <WishItem key={wish.wishId} data={wish} />
        ))}
      </Styled.WishList>
      <Modal isShowing={modalIsShowing} hide={toggleModal} className='add-modal' hasOverlay>
        <WishAdd hide={toggleModal} />
      </Modal>
    </Styled.WishContent>
  );
};

export default WishesPage;
