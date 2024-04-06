import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Home/Sidebar';
import * as Styled from '../styles/App.styled';

const AppLayout = () => {
  return (
    <Styled.App>
      <Sidebar />
      <div className='divider'></div>
      <Outlet />
    </Styled.App>
  );
};

export default AppLayout;
