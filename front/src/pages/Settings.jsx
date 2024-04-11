import React from 'react';
import Button from '../components/UI/Button';
import { useLogout } from '../hooks/use-auth';

const SettingsPage = () => {
  const { mutateAsync: logout } = useLogout();
  return (
    <div>
      <Button onClick={async () => await logout()}>Log out</Button>
    </div>
  );
};

export default SettingsPage;
