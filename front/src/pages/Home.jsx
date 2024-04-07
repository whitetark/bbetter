import React from 'react';
import Quote from '../components/Home/Quote';
import UserPhoto from '../components/Home/UserPhoto';
import Background from '../components/UI/Background';
import Button from '../components/UI/Button';
import { useLogout } from '../hooks/use-auth';
import * as Styled from '../styles/Home.styled';

const HomePage = () => {
  const { mutateAsync: logout } = useLogout();
  return (
    <Styled.Home>
      <Background />
      <Styled.HomeContent>
        <Styled.HomeHeader>
          <Styled.MiniProfile>
            <UserPhoto />
            whitetark
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
        <Button onClick={async () => await logout()}>Log out</Button>
      </Styled.HomeContent>
    </Styled.Home>
  );
};

export default HomePage;
