import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import PathConstants from '../app/shared/pathConstants';
import { Button, Modal } from '../components/UI/index';
import { WishAdd, WishListItem } from '../components/index';
import useEdit from '../hooks/use-edit';
import useModal from '../hooks/use-modal';
import { useRefetchWishes } from '../hooks/use-wish';
import * as Styled from '../styles/WishList.styled';

const WishListPage = () => {
  document.title = `bbetter - All Wishes`;
  const { isShowing: addIsShowing, toggle: toggleAdd } = useModal();
  const { isEditMode: isEdit, toggle: toggleEdit } = useEdit();
  const { wishes, error, isLoading } = useRefetchWishes();
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
          {wishes.map((wish) => (
            <WishListItem key={wish.wishId} isEdit={isEdit} data={wish} />
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
