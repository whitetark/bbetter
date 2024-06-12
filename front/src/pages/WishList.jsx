import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Pagination from '../components/UI/Paginations';
import { Button, Modal } from '../components/UI/index';
import { WishAdd, WishListItem } from '../components/index';
import useEdit from '../hooks/use-edit';
import useModal from '../hooks/use-modal';
import { useRefetchWishes } from '../hooks/use-wish';
import { TaskEmpty } from '../styles/Tasks.styled';
import * as Styled from '../styles/WishList.styled';

const WishListPage = () => {
  document.title = `bbetter - All Wishes`;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);
  const [searchParams, setSearchParams] = useSearchParams();

  const postsPerPage = 10;
  const { isShowing: addIsShowing, toggle: toggleAdd } = useModal();
  const { isEditMode: isEdit, toggle: toggleEdit } = useEdit();
  const { wishes, error, isLoading } = useRefetchWishes();

  useEffect(() => {
    const pageValue = parseInt(searchParams.get('page'));
    if (pageValue) {
      setCurrentPage(pageValue);
    }
  }, []);

  useEffect(() => {
    wishes && setTotalPages(Math.ceil(wishes.length / postsPerPage));
  }, [wishes]);

  useEffect(() => {
    const newSearch = new URLSearchParams(searchParams);
    newSearch.set('page', currentPage);
    setSearchParams(newSearch);
  }, [currentPage]);

  wishes.sort((a, b) => {
    return a.isCompleted - b.isCompleted;
  });

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  let currentWishes = wishes && wishes.slice(firstPostIndex, lastPostIndex);
  return (
    <>
      <Styled.WishList>
        <Styled.WishListHeader>
          <Styled.WishListHeaderBlock>
            <h1>Wish List</h1>
            <Styled.WishListActions>
              <Button onClick={toggleEdit} className={isEdit && 'active'}>
                <FontAwesomeIcon icon='fa-solid fa-pencil' fixedWidth />
              </Button>
              <Button onClick={toggleAdd}>
                <FontAwesomeIcon icon='fa-solid fa-plus' fixedWidth />
              </Button>
            </Styled.WishListActions>
          </Styled.WishListHeaderBlock>
          {wishes && wishes.length > 0 ? (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          ) : (
            <TaskEmpty>Create your first wish!</TaskEmpty>
          )}
        </Styled.WishListHeader>
        <Styled.WishListMain>
          {currentWishes.map((wish) => (
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
