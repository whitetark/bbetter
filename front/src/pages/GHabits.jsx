import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import { GHabitService } from '../app/services/api';
import { useAuthContext } from '../app/store/auth-context';
import GHabitDiagram from '../components/GHabits/GHabitDiagram';
import GHabitList from '../components/GHabits/GHabitList';
import LoadingWrapper from '../components/UI/LoadingWrapper';
import Pagination from '../components/UI/Paginations';
import { Button, Modal } from '../components/UI/index';
import { GHabitAdd } from '../components/index';
import { useRefetchGHabits } from '../hooks/use-ghabits';
import useModal from '../hooks/use-modal';
import * as Styled from '../styles/GHabits.styled';
import { TaskEmpty } from '../styles/Tasks.styled';

const GHabitsPage = () => {
  document.title = `bbetter - Good Habits`;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);
  const [searchParams, setSearchParams] = useSearchParams();
  const postsPerPage = 6;

  const { isShowing: modalIsShowing, toggle: toggleModal } = useModal();
  const { ghabits, error, isLoading } = useRefetchGHabits();

  const { userData } = useAuthContext();
  const requestBody = {
    AccountId: userData.accountId,
  };

  const { data: stats, isLoading: statsIsLoading } = useQuery(
    ['getGHabitStats', requestBody],
    () => GHabitService.getStats(requestBody),
    {
      onError: (error) => {
        console.log('Get GHabits error: ' + error.message);
      },
      staleTime: 1000 * 60 * 15,
    },
  );

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
        {ghabits.length > 0 ? (
          <>
            <Styled.GHabitItems>
              <GHabitList ghabits={currentPosts} />
              <Styled.FutureItem className='stats'>
                <h1>This Week Results</h1>
                <GHabitDiagram ghabits={ghabits} />
              </Styled.FutureItem>
            </Styled.GHabitItems>
            <Styled.GHabitInfo>
              <Styled.GHabitInfoItem>
                <h1>Work on</h1>
                <Styled.FutureItem>
                  <FontAwesomeIcon icon='fa-solid fa-dumbbell' fixedWidth />
                  <p>{stats?.data.value.workOn}</p>
                </Styled.FutureItem>
              </Styled.GHabitInfoItem>
              <Styled.GHabitInfoItem>
                <h1>Best Habit</h1>
                <Styled.FutureItem>
                  <FontAwesomeIcon icon='fa-solid fa-medal' fixedWidth />
                  <p>{stats?.data.value.bestHabit}</p>
                </Styled.FutureItem>
              </Styled.GHabitInfoItem>
              <Styled.GHabitInfoItem>
                <h1>Best Streaks</h1>
                <Styled.FutureItem className='row'>
                  <FontAwesomeIcon icon='fa-solid fa-fire' />
                  <LoadingWrapper>
                    <div>
                      {stats &&
                        stats?.data.value.streaks?.slice(0, 3).map((item, index) => {
                          return (
                            <p key={index}>
                              {item.content}: {item.streak}
                            </p>
                          );
                        })}
                    </div>
                  </LoadingWrapper>
                </Styled.FutureItem>
              </Styled.GHabitInfoItem>
            </Styled.GHabitInfo>
          </>
        ) : (
          <TaskEmpty>Create your first habit!</TaskEmpty>
        )}
      </Styled.GHabitMain>
      <Modal isShowing={modalIsShowing} hide={toggleModal} className='add-modal' hasOverlay>
        <GHabitAdd hide={toggleModal} />
      </Modal>
    </Styled.GHabitContent>
  );
};

export default GHabitsPage;
