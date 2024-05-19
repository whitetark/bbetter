import { useQuery } from 'react-query';
import { ReflectService } from '../app/services/api';
import { useAuthContext } from '../app/store/auth-context';
import RecentReflection from '../components/Home/RecentReflection';
import UserPhoto from '../components/Home/UserPhoto';
import WeeklyStats from '../components/Home/WeeklyStats';
import WhatToDo from '../components/Home/WhatToDo';
import ReflectionAdd from '../components/Reflections/ReflectionAdd';
import { Background, Button, Modal } from '../components/UI/index';
import { Quote } from '../components/index';
import useModal from '../hooks/use-modal';
import * as Styled from '../styles/Home.styled';

const HomePage = () => {
  document.title = `bbetter - Home`;
  const { userData } = useAuthContext();
  const { isShowing: isWTDShowing, toggle: toggleWTD } = useModal();
  const { isShowing: isReflectShowing, toggle: toggleReflect } = useModal();

  const currentDate = new Date();
  const isSunday = currentDate.getDay() == 0;
  const requestBody = {
    Id: userData.accountId,
    Type: 'week',
  };

  const { data: isReflect } = useQuery(
    ['checkReflection', requestBody],
    () => ReflectService.checkForToday(requestBody),
    {
      onError: (error) => {
        console.log('Get Reflections error: ' + error.message);
      },
      enabled: isSunday,
    },
  );

  return (
    <Styled.Home>
      <Background />
      <Styled.HomeContent>
        <Styled.HomeHeader>
          <Styled.MiniProfile>
            <UserPhoto />
            {userData.username || 'username'}
          </Styled.MiniProfile>
          <Quote />
        </Styled.HomeHeader>
        <Styled.HomeMain>
          <Styled.HomeInfo>
            <WeeklyStats />
            <RecentReflection />
          </Styled.HomeInfo>
          <Styled.HomeActionsBlock>
            <Styled.HomeActions>
              <h1>Actions</h1>
              <Button onClick={toggleWTD}>What to do?</Button>
              <Button>New Activity</Button>
              <div>
                <p>Every Sunday</p>
                <Button onClick={toggleReflect} disabled={!isSunday || isReflect?.data}>
                  Weekly Reflection
                </Button>
              </div>
            </Styled.HomeActions>
          </Styled.HomeActionsBlock>
        </Styled.HomeMain>
      </Styled.HomeContent>
      <Modal isShowing={isWTDShowing} hide={toggleWTD} className='wtd-modal' hasOverlay>
        <WhatToDo hide={toggleWTD} />
      </Modal>
      <Modal isShowing={isReflectShowing} hide={toggleReflect} className='task-modal' hasOverlay>
        <ReflectionAdd hide={toggleReflect} />
      </Modal>
    </Styled.Home>
  );
};

export default HomePage;
