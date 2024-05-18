import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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

  wishes.sort((a, b) => {
    return a.isCompleted - b.isCompleted;
  });

  return (
    <>
      <Styled.WishList>
        <Styled.WishListHeader>
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
