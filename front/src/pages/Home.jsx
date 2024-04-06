import React from 'react';
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
        <p>Your are on home page</p>
        <Button onClick={async () => await logout()}>Log out</Button>
      </Styled.HomeContent>
    </Styled.Home>
  );
};

export default HomePage;
