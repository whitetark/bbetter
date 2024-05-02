import { useAuthContext } from '../app/store/auth-context';
import { Background, Button } from '../components/UI/index';
import { Quote, UserPhoto } from '../components/index';
import * as Styled from '../styles/Home.styled';

const HomePage = () => {
  document.title = `bbetter - Home`;
  const { userData } = useAuthContext();
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
            <Button>What to do?</Button>
            <Button>Weekly Reflection</Button>
          </Styled.HomeActions>
          <Styled.HomeStats>Weekly Stats</Styled.HomeStats>
        </Styled.HomeMain>
      </Styled.HomeContent>
    </Styled.Home>
  );
};

export default HomePage;
