import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Pagination from '../components/UI/Paginations';
import { Button, Modal } from '../components/UI/index';
import { BHabitAdd, BHabitItem } from '../components/index';
import { useRefetchBHabits } from '../hooks/use-bhabits';
import useModal from '../hooks/use-modal';
import * as Styled from '../styles/BHabits.styled';

const BHabitsPage = () => {
  document.title = `bbetter - Bad Habits`;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);
  const [searchParams, setSearchParams] = useSearchParams();
  const postsPerPage = 6;

  const { isShowing: modalIsShowing, toggle: toggleModal } = useModal();
  const { bhabits, error, isLoading } = useRefetchBHabits();

  useEffect(() => {
    const pageValue = parseInt(searchParams.get('page'));
    if (pageValue) {
      setCurrentPage(pageValue);
    }
  }, []);

  useEffect(() => {
    bhabits && setTotalPages(Math.ceil(bhabits.length / postsPerPage));
  }, [bhabits]);

  useEffect(() => {
    const newSearch = new URLSearchParams(searchParams);
    newSearch.set('page', currentPage);
    setSearchParams(newSearch);
  }, [currentPage]);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  let currentPosts = bhabits && bhabits.slice(firstPostIndex, lastPostIndex);

  return (
    <Styled.BHabitContent>
      <Styled.BHabitHeader>
        <Styled.BHabitHeaderBlock>
          <h1>Bad Habits</h1>
          <Styled.BHabitActions>
            <Button onClick={toggleModal}>
              <FontAwesomeIcon icon='fa-solid fa-plus' fixedWidth />
            </Button>
          </Styled.BHabitActions>
        </Styled.BHabitHeaderBlock>
        {bhabits && bhabits.length > 0 ? (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        ) : undefined}
      </Styled.BHabitHeader>
      <Styled.BHabitList>
        {currentPosts.map((bhabit) => (
          <BHabitItem key={bhabit.bHabitId} data={bhabit} />
        ))}
      </Styled.BHabitList>
      <Modal isShowing={modalIsShowing} hide={toggleModal} className='add-modal' hasOverlay>
        <BHabitAdd hide={toggleModal} />
      </Modal>
    </Styled.BHabitContent>
  );
};

export default BHabitsPage;
