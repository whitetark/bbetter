import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import GHabitList from '../components/GHabits/GHabitList';
import Pagination from '../components/UI/Paginations';
import { Button, Modal } from '../components/UI/index';
import { GHabitAdd } from '../components/index';
import { useRefetchGHabits } from '../hooks/use-ghabits';
import useModal from '../hooks/use-modal';
import * as Styled from '../styles/GHabits.styled';

const GHabitsPage = () => {
  document.title = `bbetter - Good Habits`;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);
  const [searchParams, setSearchParams] = useSearchParams();
  const postsPerPage = 6;

  const { isShowing: modalIsShowing, toggle: toggleModal } = useModal();
  const { ghabits, error, isLoading } = useRefetchGHabits();

  useEffect(() => {
    const pageValue = parseInt(searchParams.get('page'));
    if (pageValue) {
      setCurrentPage(pageValue);
    }
  }, []);

  useEffect(() => {
    ghabits && setTotalPages(Math.ceil(ghabits.length / postsPerPage));
  }, [ghabits]);

  useEffect(() => {
    const newSearch = new URLSearchParams(searchParams);
    newSearch.set('page', currentPage);
    setSearchParams(newSearch);
  }, [currentPage]);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  let currentPosts = ghabits && ghabits.slice(firstPostIndex, lastPostIndex);

  return (
    <Styled.GHabitContent>
      <Styled.GHabitHeader>
        <Styled.GHabitHeaderBlock>
          <h1>Good Habits</h1>
          <Styled.GHabitActions>
            <Button onClick={toggleModal}>
              <FontAwesomeIcon icon='fa-solid fa-plus' fixedWidth />
            </Button>
          </Styled.GHabitActions>
        </Styled.GHabitHeaderBlock>
        {ghabits && ghabits.length > 0 ? (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        ) : undefined}
      </Styled.GHabitHeader>
      <Styled.GHabitMain>
        <Styled.GHabitItems>
          <GHabitList ghabits={currentPosts} />
          <Styled.FutureItem>Week Stats</Styled.FutureItem>
        </Styled.GHabitItems>
        <Styled.GHabitInfo>
          <Styled.FutureItem>Work On</Styled.FutureItem>
          <Styled.FutureItem>Best Habit</Styled.FutureItem>
          <Styled.FutureItem>Streaks</Styled.FutureItem>
        </Styled.GHabitInfo>
      </Styled.GHabitMain>
      <Modal isShowing={modalIsShowing} hide={toggleModal} className='add-modal' hasOverlay>
        <GHabitAdd hide={toggleModal} />
      </Modal>
    </Styled.GHabitContent>
  );
};

export default GHabitsPage;
