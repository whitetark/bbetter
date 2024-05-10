import { useAuthContext } from '../app/store/auth-context';
import WhatToDo from '../components/Home/WhatToDo';
import { Background, Button, Modal } from '../components/UI/index';
import { Quote, UserPhoto } from '../components/index';
import useModal from '../hooks/use-modal';
import * as Styled from '../styles/Home.styled';

const HomePage = () => {
  document.title = `bbetter - Home`;
  const { userData } = useAuthContext();
  const { isShowing, toggle } = useModal();
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
            <Button onClick={toggle}>What to do?</Button>
            <Button>Weekly Reflection</Button>
          </Styled.HomeActions>
          <Styled.HomeStats>Weekly Stats</Styled.HomeStats>
        </Styled.HomeMain>
      </Styled.HomeContent>
      <Modal isShowing={isShowing} hide={toggle} className='wtd-modal' hasOverlay>
        <WhatToDo hide={toggle} />
      </Modal>
    </Styled.Home>
  );
};

export default HomePage;
