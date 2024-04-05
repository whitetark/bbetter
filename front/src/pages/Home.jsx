import React from 'react';
import Button from '../components/UI/Button';
import { useLogout } from '../hooks/use-auth';

const HomePage = () => {
  const { mutateAsync: logout } = useLogout();
  return (
    <div>
      <p>Your are on home page</p>
      <Button onClick={async () => await logout()}>Log out</Button>
    </div>
  );
};

export default HomePage;
