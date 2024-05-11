import { useAuthContext } from '../app/store/auth-context';
import WhatToDo from '../components/Home/WhatToDo';
import ReflectionAdd from '../components/Settings/ReflectionAdd';
import { Background, Button, Modal } from '../components/UI/index';
import { Quote, UserPhoto } from '../components/index';
import useModal from '../hooks/use-modal';
import * as Styled from '../styles/Home.styled';

const HomePage = () => {
  document.title = `bbetter - Home`;
  const { userData } = useAuthContext();
  const { isShowing: isWTDShowing, toggle: toggleWTD } = useModal();
  const { isShowing: isReflectShowing, toggle: toggleReflect } = useModal();

  var currentDate = new Date();
  var dayOfWeek = currentDate.getDay();

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
          <Styled.HomeActions>
            <Button onClick={toggleWTD}>What to do?</Button>
            <Button onClick={toggleReflect} disabled={dayOfWeek !== 0}>
              Weekly Reflection
            </Button>
          </Styled.HomeActions>
          <Styled.HomeStats>Weekly Stats</Styled.HomeStats>
        </Styled.HomeMain>
      </Styled.HomeContent>
      <Modal isShowing={isWTDShowing} hide={toggleWTD} className='wtd-modal' hasOverlay>
        <WhatToDo hide={toggleWTD} />
      </Modal>
      <Modal isShowing={isReflectShowing} hide={toggleReflect} className='task-modal' hasOverlay>
        <ReflectionAdd />
      </Modal>
    </Styled.Home>
  );
};

export default HomePage;
